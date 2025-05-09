import React, { useEffect, useRef, useState } from 'react';
import { Terminal } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import { Rnd } from 'react-rnd';
import './Css/Terminal.css';

const TerminalComponent = ({ onClose, isVisible, fileSystem, setFileSystem, addFolder }) => {
  const terminalRef = useRef(null);
  const terminal = useRef(null);
  const fitAddon = useRef(new FitAddon());
  const inputBuffer = useRef('');
  const [currentPath, setCurrentPath] = useState('/');
  const [username, setUsername] = useState('user');

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername || 'user');
  }, []);

  useEffect(() => {
    if (!isVisible || !terminalRef.current) return;

    if (!terminal.current) {
      terminal.current = new Terminal({
        fontSize: 14,
        cursorBlink: true,
        theme: {
          foreground: '#ffffff',
          background: '#1a1a1a',
        },
      });

      terminal.current.loadAddon(fitAddon.current);
      terminal.current.open(terminalRef.current);

      const fitSafely = () => {
        const container = terminalRef.current;
        if (container && container.offsetWidth > 0 && container.offsetHeight > 0) {
          try {
            fitAddon.current.fit();
          } catch (err) {
            console.error("Safe fit error:", err);
          }
        } else {
          requestAnimationFrame(fitSafely);
        }
      };

      requestAnimationFrame(fitSafely);

      terminal.current.write(`Welcome to Jade OS Terminal!\r\n${username}@JadeOS:${currentPath} $ `);
      terminal.current.onData(handleInput);
    }

    return () => {
      if (terminal.current) {
        terminal.current.dispose();
        terminal.current = null;
      }
    };
  }, [isVisible, currentPath, username]);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (terminal.current) {
        try {
          fitAddon.current.fit();
        } catch (err) {
          console.error('Fit error on resize:', err);
        }
      }
    });

    if (terminalRef.current) {
      observer.observe(terminalRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleInput = (data) => {
    if (data === '\r') {
      const command = inputBuffer.current.trim();
      terminal.current.write('\r\n');
      handleCommand(command);
      inputBuffer.current = '';
    } else if (data === '\u007F') {
      if (inputBuffer.current.length > 0) {
        inputBuffer.current = inputBuffer.current.slice(0, -1);
        terminal.current.write('\b \b');
      }
    } else {
      inputBuffer.current += data;
      terminal.current.write(data);
    }
  };

  const handleCommand = (cmd) => {
    const args = cmd.trim().split(' ').filter(Boolean);
    const command = args[0] || '';
    const params = args.slice(1);
    let output = '';

    switch (command) {
      case 'pwd':
        output = currentPath;
        break;
      case 'ls':
        output = listDirectory(currentPath);
        break;
      case 'mkdir':
        if (params.length === 1) {
          makeDirectory(currentPath, params[0]);
          output = `Directory ${params[0]} created.`;
        } else {
          output = 'Usage: mkdir <directory-name>';
        }
        break;
      case 'touch':
        if (params.length === 1) {
          createFile(currentPath, params[0]);
          output = `File ${params[0]} created.`;
        } else {
          output = 'Usage: touch <file-name>';
        }
        break;
      case 'create':
        if (params.length >= 2) {
          const fileName = params[0];
          const fileContent = params.slice(1).join(' ');
          createFile(currentPath, fileName, fileContent);
          output = `File ${fileName} created with content: "${fileContent}"`;
        } else {
          output = 'Usage: create <file-name> <content>';
        }
        break;
      case 'cd':
        if (params.length === 1) {
          const newPath = changeDirectory(currentPath, params[0]);
          if (newPath) {
            setCurrentPath(newPath);
            output = `Changed directory to ${newPath}`;
          } else {
            output = `Directory not found: ${params[0]}`;
          }
        } else {
          output = 'Usage: cd <directory>';
        }
        break;
      case 'cls':
        terminal.current.clear();
        return;
      case 'exit':
        onClose();
        return;
      case '':
        break;
      default:
        output = `Command not found: ${command}`;
    }

    terminal.current.write(`\r\n${output}\r\n${username}@JadeOS:${currentPath} $ `);
  };

  const listDirectory = (path) => {
    const dir = getDirectory(path);
    return dir ? Object.keys(dir).join('  ') || 'Empty' : 'Directory not found';
  };

  const makeDirectory = (path, dirName) => {
    const dir = getDirectory(path);
    const fullPath = `${path.replace(/\/$/, '')}/${dirName}`;
    if (dir && !dir[dirName]) {
      dir[dirName] = {};
      setFileSystem({ ...fileSystem });
      if (addFolder) {
        addFolder({ name: dirName, path: fullPath });
      }
    }
  };

  const createFile = (path, fileName, content = '') => {
    const dir = getDirectory(path);
    if (dir && !dir[fileName]) {
      dir[fileName] = content;
      setFileSystem({ ...fileSystem });
    } else {
      terminal.current.write('\r\nFile already exists or path invalid.');
    }
  };

  const changeDirectory = (path, target) => {
    let newPath;
    if (target === '..') {
      const parts = path.split('/').filter(Boolean);
      parts.pop();
      newPath = '/' + parts.join('/');
    } else {
      newPath = `${path.replace(/\/$/, '')}/${target}`;
    }
    return getDirectory(newPath) ? newPath : null;
  };

  const getDirectory = (path) => {
    const parts = path.split('/').filter(Boolean);
    let dir = fileSystem['/'];
    for (const part of parts) {
      if (dir[part] && typeof dir[part] === 'object') {
        dir = dir[part];
      } else {
        return null;
      }
    }
    return dir;
  };

  if (!isVisible) return null;

  return (
    <Rnd
      default={{ x: 50, y: 50, width: 800, height: 400 }}
      minWidth={300}
      minHeight={200}
      bounds="parent"
      style={{
        backgroundColor: '#1a1a1a',
        borderRadius: '8px',
        overflow: 'hidden',
        boxShadow: '0 0 20px rgba(0,0,0,0.5)',
        fontFamily: 'monospace',
      }}
    >
      <div
        style={{
          backgroundColor: '#2e2e2e',
          height: '30px',
          display: 'flex',
          alignItems: 'center',
          padding: '0 10px',
        }}
      >
        <div style={{ display: 'flex', gap: '8px' }}>
          <div title="Close" onClick={onClose} style={{ width: 12, height: 12, backgroundColor: '#ff5f56', borderRadius: '50%', cursor: 'pointer' }} />
          <div style={{ width: 12, height: 12, backgroundColor: '#ffbd2e', borderRadius: '50%' }} />
          <div style={{ width: 12, height: 12, backgroundColor: '#27c93f', borderRadius: '50%' }} />
        </div>
      </div>
      <div className="terminal-container" style={{ width: '100%', height: 'calc(100% - 30px)' }}>
        <div ref={terminalRef} style={{ width: '100%', height: '100%' }} />
      </div>
    </Rnd>
  );
};

export default TerminalComponent;
