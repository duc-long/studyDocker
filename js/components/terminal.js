/**
 * Terminal Emulator and Virtual Docker Engine
 */
class VirtualTerminal {
  constructor(outputElId, inputElId) {
    this.outputEl = document.getElementById(outputElId);
    this.inputEl = document.getElementById(inputElId);
    this.commandHistory = [];
    this.historyIndex = -1;
    
    // Virtual Docker Engine State
    this.images = [
      { id: "3f5d8a9e", name: "nginx:latest", tag: "latest", size: "142MB", created: "2 days ago" },
      { id: "e9a8f2c1", name: "postgres:15-alpine", tag: "15-alpine", size: "37.9MB", created: "1 week ago" },
      { id: "a5b4c3d2", name: "ubuntu:20.04", tag: "20.04", size: "72.8MB", created: "3 weeks ago" }
    ];
    this.containers = [];
    this.volumes = [
      { name: "default-vol", scope: "local", driver: "local", size: "0 B" }
    ];
    this.networks = [
      { name: "bridge", driver: "bridge", scope: "local" },
      { name: "host", driver: "host", scope: "local" },
      { name: "none", driver: "null", scope: "local" }
    ];
    
    this.initEvents();
  }

  initEvents() {
    if (!this.inputEl) return;
    
    this.inputEl.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = this.inputEl.value.trim();
        if (cmd) {
          this.execute(cmd);
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
        }
        this.inputEl.value = "";
      } else if (e.key === "ArrowUp") {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputEl.value = this.commandHistory[this.historyIndex];
        }
        e.preventDefault();
      } else if (e.key === "ArrowDown") {
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.inputEl.value = this.commandHistory[this.historyIndex];
        } else {
          this.historyIndex = this.commandHistory.length;
          this.inputEl.value = "";
        }
        e.preventDefault();
      }
    });
    
    // Auto focus on terminal click
    const terminalContainer = this.outputEl.closest(".terminal-container");
    if (terminalContainer) {
      terminalContainer.addEventListener("click", () => {
        this.inputEl.focus();
      });
    }
  }

  writeLine(text, type = "default") {
    const line = document.createElement("div");
    line.className = `term-line ${type}`;
    // Simple terminal syntax highlighting
    if (text.startsWith("user@docker-lab")) {
      line.innerHTML = text;
    } else {
      line.textContent = text;
    }
    this.outputEl.appendChild(line);
    this.outputEl.scrollTop = this.outputEl.scrollHeight;
  }

  clear() {
    this.outputEl.innerHTML = "";
  }

  execute(commandLine) {
    this.writeLine(`user@docker-lab:~$ ${commandLine}`, "command-echo");
    
    // DevOps Escape Room Command Intercept
    if (window.appManager && window.appManager.escapeRoomActive) {
      if (window.appManager.handleEscapeRoomCommand(commandLine)) {
        return;
      }
    }
    
    const args = this.parseArgs(commandLine);
    const mainCommand = args[0];
    
    if (mainCommand === "clear") {
      this.clear();
      return;
    }

    if (mainCommand === "trivy") {
      this.writeLine("Scanning container image for vulnerabilities using Trivy...");
      this.writeLine("TOTAL: 0 (HIGH: 0, CRITICAL: 0, MEDIUM: 0, LOW: 0)");
      this.writeLine("✓ Image vulnerability check passed successfully!", "success");
      return;
    }
    
    if (mainCommand === "help") {
      this.writeLine("Available commands:");
      this.writeLine("  clear                      Clear the terminal screen");
      this.writeLine("  help                       Display this help menu");
      this.writeLine("  docker version             Display Docker version details");
      this.writeLine("  docker info                Show system-wide Docker information");
      this.writeLine("  docker images              List local images");
      this.writeLine("  docker ps                  List running containers (use '-a' for all)");
      this.writeLine("  docker pull [image]        Download an image from Docker Hub");
      this.writeLine("  docker run [options] [img] Run a container from an image");
      this.writeLine("  docker stop [container]    Stop a running container");
      this.writeLine("  docker start [container]   Start a stopped container");
      this.writeLine("  docker restart [container] Restart a container");
      this.writeLine("  docker rm [container]      Remove a container");
      this.writeLine("  docker rmi [image]         Remove an image");
      this.writeLine("  docker logs [container]    Fetch logs of a container");
      this.writeLine("  docker inspect [container] Return low-level JSON details");
      this.writeLine("  docker volume [subcmd]     Manage volumes (create, ls)");
      this.writeLine("  docker network [subcmd]    Manage networks (create, ls)");
      return;
    }
    
    if (mainCommand === "docker") {
      this.handleDockerCommand(args.slice(1));
    } else {
      this.writeLine(`bash: ${mainCommand}: command not found. Type 'help' for suggestions.`, "error");
    }
    
    // Check if this action satisfies the current practice scenario
    if (window.appManager) {
      window.appManager.checkPracticeState("terminal", commandLine);
    }
  }

  parseArgs(commandLine) {
    // Split by spaces, but preserve quoted arguments
    const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
    const args = [];
    let match;
    do {
      match = regex.exec(commandLine);
      if (match) {
        args.push(match[1] || match[2] || match[0]);
      }
    } while (match);
    return args;
  }

  handleDockerCommand(args) {
    if (args.length === 0) {
      this.writeLine("Usage: docker [OPTIONS] COMMAND", "error");
      this.writeLine("Run 'docker --help' or 'help' for more information.");
      return;
    }
    
    const subCommand = args[0];
    
    switch (subCommand) {
      case "version":
        this.writeLine("Docker version 24.0.7, build afdd53b");
        this.writeLine("Go version: go1.20.10");
        this.writeLine("Git commit: afdd53b05f");
        this.writeLine("Built: Thu Oct 26 09:08:44 2023");
        this.writeLine("OS/Arch: linux/amd64");
        this.writeLine("Context: default");
        break;
        
      case "info":
        this.writeLine("Client: Docker Engine - Community");
        this.writeLine(`Containers: ${this.containers.length}`);
        this.writeLine(` Running: ${this.containers.filter(c => c.status === "running").length}`);
        this.writeLine(` Paused: 0`);
        this.writeLine(` Stopped: ${this.containers.filter(c => c.status === "stopped").length}`);
        this.writeLine(`Images: ${this.images.length}`);
        this.writeLine("Server Version: 24.0.7");
        this.writeLine("Storage Driver: overlay2");
        this.writeLine("Kernel Version: 5.15.0-88-generic");
        this.writeLine("Operating System: Ubuntu 22.04.3 LTS");
        this.writeLine("CPUs: 2");
        this.writeLine("Total Memory: 3.844GiB");
        break;
        
      case "images":
        this.writeLine(this.padRight("REPOSITORY", 25) + this.padRight("TAG", 15) + this.padRight("IMAGE ID", 15) + this.padRight("SIZE", 10));
        this.images.forEach(img => {
          this.writeLine(this.padRight(img.name.split(":")[0], 25) + this.padRight(img.tag, 15) + this.padRight(img.id, 15) + this.padRight(img.size, 10));
        });
        break;
        
      case "pull":
        if (args.length < 2) {
          this.writeLine("Error: 'docker pull' requires exactly 1 argument.", "error");
          return;
        }
        const imgName = args[1];
        this.writeLine(`Using default tag: latest`);
        this.writeLine(`Pulling from library/${imgName}`);
        this.writeLine(`f7f1e58e317c: Pulling fs layer`);
        this.writeLine(`f7f1e58e317c: Download complete`);
        this.writeLine(`f7f1e58e317c: Pull complete`);
        this.writeLine(`Digest: sha256:4b4c73bc928ebae28ef9f12d8a4e8d3568c07802aa20d8a4f89d35272a818d6e`);
        
        const exist = this.images.find(img => img.name === imgName || img.name.split(":")[0] === imgName);
        if (!exist) {
          const shortName = imgName.includes(":") ? imgName : `${imgName}:latest`;
          this.images.push({
            id: Math.random().toString(36).substring(2, 10),
            name: shortName,
            tag: shortName.split(":")[1],
            size: `${(Math.random() * 100 + 40).toFixed(1)}MB`,
            created: "Just now"
          });
        }
        this.writeLine(`Status: Downloaded newer image for ${imgName}`, "success");
        break;
        
      case "ps":
        const showAll = args.includes("-a") || args.includes("--all");
        let list = this.containers;
        if (!showAll) {
          list = this.containers.filter(c => c.status === "running");
        }
        
        if (list.length === 0) {
          this.writeLine("CONTAINER ID   IMAGE     COMMAND   CREATED   STATUS    PORTS     NAMES");
          return;
        }
        
        this.writeLine(
          this.padRight("CONTAINER ID", 15) + 
          this.padRight("IMAGE", 20) + 
          this.padRight("STATUS", 15) + 
          this.padRight("PORTS", 20) + 
          "NAMES"
        );
        
        list.forEach(c => {
          this.writeLine(
            this.padRight(c.id, 15) + 
            this.padRight(c.image, 20) + 
            this.padRight(c.status === "running" ? "Up just now" : "Exited (0)", 15) + 
            this.padRight(c.ports || "-", 20) + 
            c.name
          );
        });
        break;
        
      case "run":
        this.handleDockerRun(args.slice(1));
        break;
        
      case "stop":
        if (args.length < 2) {
          this.writeLine("Error: 'docker stop' requires container name or ID.", "error");
          return;
        }
        const stopTarget = args[1];
        const containerToStop = this.containers.find(c => c.name === stopTarget || c.id === stopTarget);
        if (containerToStop) {
          containerToStop.status = "stopped";
          this.writeLine(stopTarget, "success");
          
          // Trigger custom action (like refreshing browser view or Docker desktop GUI)
          if (window.appManager) window.appManager.updateDockerDesktop();
        } else {
          this.writeLine(`Error response from daemon: No such container: ${stopTarget}`, "error");
        }
        break;
        
      case "start":
        if (args.length < 2) {
          this.writeLine("Error: 'docker start' requires container name or ID.", "error");
          return;
        }
        const startTarget = args[1];
        const containerToStart = this.containers.find(c => c.name === startTarget || c.id === startTarget);
        if (containerToStart) {
          containerToStart.status = "running";
          this.writeLine(startTarget, "success");
          if (window.appManager) window.appManager.updateDockerDesktop();
        } else {
          this.writeLine(`Error response from daemon: No such container: ${startTarget}`, "error");
        }
        break;
        
      case "restart":
        if (args.length < 2) {
          this.writeLine("Error: 'docker restart' requires container name or ID.", "error");
          return;
        }
        const restartTarget = args[1];
        const containerToRestart = this.containers.find(c => c.name === restartTarget || c.id === restartTarget);
        if (containerToRestart) {
          containerToRestart.status = "running";
          this.writeLine(restartTarget, "success");
          if (window.appManager) window.appManager.updateDockerDesktop();
        } else {
          this.writeLine(`Error response from daemon: No such container: ${restartTarget}`, "error");
        }
        break;
        
      case "rm":
        if (args.length < 2) {
          this.writeLine("Error: 'docker rm' requires container name or ID.", "error");
          return;
        }
        const rmTarget = args[1];
        const cIdx = this.containers.findIndex(c => c.name === rmTarget || c.id === rmTarget);
        if (cIdx !== -1) {
          if (this.containers[cIdx].status === "running" && !args.includes("-f")) {
            this.writeLine(`Error response from daemon: You cannot remove a running container ${rmTarget}. Stop the container or use -f`, "error");
            return;
          }
          this.containers.splice(cIdx, 1);
          this.writeLine(rmTarget, "success");
          if (window.appManager) window.appManager.updateDockerDesktop();
        } else {
          this.writeLine(`Error response from daemon: No such container: ${rmTarget}`, "error");
        }
        break;
        
      case "rmi":
        if (args.length < 2) {
          this.writeLine("Error: 'docker rmi' requires image name or ID.", "error");
          return;
        }
        const rmiTarget = args[1];
        const imgIdx = this.images.findIndex(i => i.name === rmiTarget || i.id === rmiTarget);
        if (imgIdx !== -1) {
          this.images.splice(imgIdx, 1);
          this.writeLine(`Deleted image: ${rmiTarget}`, "success");
          if (window.appManager) window.appManager.updateDockerDesktop();
        } else {
          this.writeLine(`Error response from daemon: No such image: ${rmiTarget}`, "error");
        }
        break;
        
      case "logs":
        if (args.length < 2) {
          this.writeLine("Error: 'docker logs' requires container name or ID.", "error");
          return;
        }
        const logTarget = args[1];
        const logContainer = this.containers.find(c => c.name === logTarget || c.id === logTarget);
        if (logContainer) {
          this.writeLine(`--- Logs for container ${logTarget} ---`);
          if (logContainer.image.includes("nginx")) {
            this.writeLine("127.0.0.1 - - [18/May/2026 13:30:11] \"GET / HTTP/1.1\" 200 -");
            this.writeLine("127.0.0.1 - - [18/May/2026 13:31:05] \"GET /index.html HTTP/1.1\" 200 -");
            this.writeLine("nginx is running and listening on port 80");
          } else if (logContainer.image.includes("postgres")) {
            this.writeLine("PostgreSQL Database directory appears to contain a database; Skipping initialization");
            this.writeLine("server started, listening on IPv4 address \"0.0.0.0\", port 5432");
            this.writeLine("database system is ready to accept connections");
          } else {
            this.writeLine("Container starting up...");
            this.writeLine("Running default command...");
            this.writeLine("Listening on port 8080...");
          }
        } else {
          this.writeLine(`Error: No such container: ${logTarget}`, "error");
        }
        break;
        
      case "inspect":
        if (args.length < 2) {
          this.writeLine("Error: 'docker inspect' requires container name or ID.", "error");
          return;
        }
        const inspectTarget = args[1];
        const inspectContainer = this.containers.find(c => c.name === inspectTarget || c.id === inspectTarget);
        if (inspectContainer) {
          const inspectJSON = [
            {
              "Id": inspectContainer.id,
              "Created": new Date().toISOString(),
              "State": {
                "Status": inspectContainer.status,
                "Running": inspectContainer.status === "running"
              },
              "Image": inspectContainer.image,
              "NetworkSettings": {
                "IPAddress": "172.17.0.2",
                "Ports": {
                  "80/tcp": [{ "HostIp": "0.0.0.0", "HostPort": inspectContainer.ports ? inspectContainer.ports.split(":")[0] : "" }]
                }
              },
              "Mounts": inspectContainer.volume ? [{ "Type": "volume", "Name": inspectContainer.volume }] : []
            }
          ];
          this.writeLine(JSON.stringify(inspectJSON, null, 2));
        } else {
          this.writeLine(`Error: No such container: ${inspectTarget}`, "error");
        }
        break;
        
      case "volume":
        this.handleDockerVolume(args.slice(1));
        break;
        
      case "network":
        this.handleDockerNetwork(args.slice(1));
        break;
        
      case "exec":
        if (args.length < 3) {
          this.writeLine("Usage: docker exec -it [CONTAINER] [SHELL]", "error");
          return;
        }
        const execTarget = args[args.length - 2];
        const execShell = args[args.length - 1];
        const execContainer = this.containers.find(c => c.name === execTarget || c.id === execTarget);
        if (execContainer) {
          if (execContainer.status !== "running") {
            this.writeLine(`Error: Container ${execTarget} is not running`, "error");
            return;
          }
          this.writeLine(`Entering interactive shell '${execShell}' inside ${execTarget}...`);
          this.writeLine(`root@${execTarget}:/# ls`);
          this.writeLine("bin  boot  dev  etc  home  lib  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var");
          this.writeLine(`root@${execTarget}:/# exit`);
          this.writeLine(`Connection to ${execTarget} closed.`, "success");
        } else {
          this.writeLine(`Error response from daemon: No such container: ${execTarget}`, "error");
        }
        break;
        
      case "stats":
        this.writeLine(this.padRight("CONTAINER ID", 15) + this.padRight("NAME", 15) + this.padRight("CPU %", 10) + this.padRight("MEM USAGE / LIMIT", 22) + this.padRight("MEM %", 10) + this.padRight("NET I/O", 15));
        this.containers.filter(c => c.status === "running").forEach(c => {
          this.writeLine(this.padRight(c.id, 15) + this.padRight(c.name, 15) + this.padRight("0.12%", 10) + this.padRight("15.4MiB / 3.84GiB", 22) + this.padRight("0.39%", 10) + this.padRight("1.2kB / 0B", 15));
        });
        if (this.containers.filter(c => c.status === "running").length === 0) {
          this.writeLine(this.padRight("95e28ab3", 15) + this.padRight("my-postgres", 15) + this.padRight("0.05%", 10) + this.padRight("28.5MiB / 3.84GiB", 22) + this.padRight("0.72%", 10) + this.padRight("4.5kB / 1.2kB", 15));
        }
        break;
        
      case "top":
        if (args.length < 2) {
          this.writeLine("Error: 'docker top' requires container name or ID.", "error");
          return;
        }
        this.writeLine(this.padRight("UID", 10) + this.padRight("PID", 10) + this.padRight("PPID", 10) + this.padRight("C", 5) + this.padRight("STIME", 10) + this.padRight("TTY", 10) + this.padRight("TIME", 10) + "CMD");
        this.writeLine(this.padRight("root", 10) + this.padRight("1284", 10) + this.padRight("1260", 10) + this.padRight("0", 5) + this.padRight("14:32", 10) + this.padRight("?", 10) + this.padRight("00:00:01", 10) + "nginx -g 'daemon off;'");
        break;
        
      case "update":
        if (args.length < 2) {
          this.writeLine("Error: 'docker update' requires container name or ID.", "error");
          return;
        }
        this.writeLine("Resources updated successfully.", "success");
        break;
        
      case "system":
        if (args[1] === "prune") {
          this.writeLine("WARNING! This will remove all stopped containers and unused networks/volumes.");
          this.writeLine("Total reclaimed space: 142.4MB", "success");
        } else {
          this.writeLine("Usage: docker system prune");
        }
        break;
        
      case "events":
        this.writeLine(`${new Date().toISOString()} container start my-web (image=nginx:latest)`);
        this.writeLine(`${new Date().toISOString()} container inspect my-web (image=nginx:latest)`);
        break;
        
      case "attach":
        if (args.length < 2) {
          this.writeLine("Error: 'docker attach' requires container name or ID.", "error");
          return;
        }
        this.writeLine(`Attaching to container ${args[1]}...`);
        this.writeLine("Press Ctrl+C to detach.");
        this.writeLine("[App logs console starts attaching here]");
        break;
        
      case "scout":
        this.writeLine("docker-scout analysis complete.");
        this.writeLine("✓ No high or critical vulnerabilities found in image layers.", "success");
        break;
        
      default:
        this.writeLine(`docker: '${subCommand}' is not a docker command.`, "error");
        this.writeLine("See 'docker --help' or 'help'.");
    }
  }

  handleDockerRun(args) {
    if (args.length === 0) {
      this.writeLine("Error: 'docker run' requires an image name.", "error");
      return;
    }
    
    let isDetached = false;
    let portMapping = null;
    let name = null;
    let volumeMapping = null;
    let networkName = null;
    let envs = [];
    
    // Parse flags
    let imgIndex = 0;
    for (let i = 0; i < args.length; i++) {
      if (args[i] === "-d") {
        isDetached = true;
      } else if (args[i] === "-p" && i + 1 < args.length) {
        portMapping = args[i + 1];
        i++;
      } else if (args[i] === "--name" && i + 1 < args.length) {
        name = args[i + 1];
        i++;
      } else if (args[i] === "-v" && i + 1 < args.length) {
        volumeMapping = args[i + 1];
        i++;
      } else if (args[i] === "--network" && i + 1 < args.length) {
        networkName = args[i + 1];
        i++;
      } else if (args[i] === "-e" && i + 1 < args.length) {
        envs.push(args[i + 1]);
        i++;
      } else if (!args[i].startsWith("-")) {
        imgIndex = i;
        break;
      }
    }
    
    const targetImageName = args[imgIndex];
    if (!targetImageName) {
      this.writeLine("Error: Missing image name parameter.", "error");
      return;
    }
    
    // Check if image exists, if not pull it
    const imgExists = this.images.some(i => i.name === targetImageName || i.name.split(":")[0] === targetImageName);
    if (!imgExists) {
      this.writeLine(`Unable to find image '${targetImageName}' locally`);
      this.writeLine(`Pulling from library/${targetImageName}...`);
      this.writeLine(`Status: Downloaded image for ${targetImageName}`);
      this.images.push({
        id: Math.random().toString(36).substring(2, 10),
        name: targetImageName.includes(":") ? targetImageName : `${targetImageName}:latest`,
        tag: targetImageName.includes(":") ? targetImageName.split(":")[1] : "latest",
        size: "82.4MB",
        created: "Just now"
      });
    }
    
    const finalName = name || `container-${Math.floor(Math.random() * 1000)}`;
    const finalId = Math.random().toString(36).substring(2, 12);
    
    const newContainer = {
      id: finalId,
      name: finalName,
      image: targetImageName,
      status: "running",
      ports: portMapping,
      volume: volumeMapping,
      network: networkName,
      envs: envs
    };
    
    // Check duplicate name
    if (this.containers.some(c => c.name === finalName)) {
      this.writeLine(`Error response from daemon: Conflict. The container name \"${finalName}\" is already in use by container \"${finalId}\". You have to remove that container to be able to reuse that name.`, "error");
      return;
    }
    
    this.containers.push(newContainer);
    
    if (isDetached) {
      // In detached mode, print container hash and return
      this.writeLine(finalId, "success");
    } else {
      // In attached mode, simulate some log outputs
      this.writeLine(`[INFO] Starting up ${targetImageName}...`);
      this.writeLine(`[INFO] Server running on port ${portMapping ? portMapping.split(":")[1] : "80"}...`);
      this.writeLine("Type Ctrl+C or stop from another terminal to exit (Attached mode simulated).");
    }
    
    if (window.appManager) {
      window.appManager.updateDockerDesktop();
      // If port 8080 is mapped, update the browser mockup preview
      if (portMapping && portMapping.includes("8080")) {
        window.appManager.updateBrowserPreview(targetImageName);
      }
    }
  }

  handleDockerVolume(args) {
    if (args.length === 0) {
      this.writeLine("Usage: docker volume COMMAND", "error");
      return;
    }
    
    const subCmd = args[0];
    if (subCmd === "create") {
      const volName = args[1] || `vol-${Math.floor(Math.random() * 1000)}`;
      this.volumes.push({
        name: volName,
        scope: "local",
        driver: "local",
        size: "0 B"
      });
      this.writeLine(volName, "success");
      if (window.appManager) window.appManager.updateDockerDesktop();
    } else if (subCmd === "ls") {
      this.writeLine("DRIVER    VOLUME NAME");
      this.volumes.forEach(v => {
        this.writeLine(`${this.padRight(v.driver, 10)}${v.name}`);
      });
    } else {
      this.writeLine(`docker volume ${subCmd} is not implemented.`, "error");
    }
  }

  handleDockerNetwork(args) {
    if (args.length === 0) {
      this.writeLine("Usage: docker network COMMAND", "error");
      return;
    }
    
    const subCmd = args[0];
    if (subCmd === "create") {
      const netName = args[1] || `net-${Math.floor(Math.random() * 1000)}`;
      this.networks.push({
        name: netName,
        driver: "bridge",
        scope: "local"
      });
      this.writeLine(netName, "success");
      if (window.appManager) window.appManager.updateDockerDesktop();
    } else if (subCmd === "ls") {
      this.writeLine(this.padRight("NETWORK ID", 15) + this.padRight("NAME", 20) + this.padRight("DRIVER", 15) + "SCOPE");
      this.networks.forEach((n, idx) => {
        this.writeLine(this.padRight(`n9f4d3a${idx}`, 15) + this.padRight(n.name, 20) + this.padRight(n.driver, 15) + n.scope);
      });
    } else {
      this.writeLine(`docker network ${subCmd} is not implemented.`, "error");
    }
  }

  padRight(str, length) {
    if (str.length >= length) return str;
    return str + " ".repeat(length - str.length);
  }
}
