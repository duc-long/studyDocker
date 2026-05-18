/**
 * VSCode-like Editor and Workspace component
 */
class VirtualEditor {
  constructor(editorId, fileTreeId, filenameId, buildBtnId) {
    this.editorEl = document.getElementById(editorId);
    this.fileTreeEl = document.getElementById(fileTreeId);
    this.filenameEl = document.getElementById(filenameId);
    this.buildBtnEl = document.getElementById(buildBtnId);
    this.feedbackEl = document.getElementById("editor-feedback");
    
    this.files = {};
    this.activeFile = null;
    
    this.initEvents();
  }

  initEvents() {
    if (this.editorEl) {
      this.editorEl.addEventListener("input", () => {
        if (this.activeFile) {
          this.files[this.activeFile] = this.editorEl.value;
        }
      });
    }

    if (this.buildBtnEl) {
      this.buildBtnEl.addEventListener("click", () => {
        this.runBuild();
      });
    }
  }

  loadFiles(fileArray) {
    this.files = {};
    if (!fileArray || fileArray.length === 0) {
      this.renderFileTree();
      this.activeFile = null;
      if (this.editorEl) this.editorEl.value = "";
      if (this.filenameEl) this.filenameEl.innerHTML = `No file open`;
      this.hideFeedback();
      return;
    }

    fileArray.forEach(file => {
      this.files[file.name] = file.content;
    });

    // Open first file by default
    this.activeFile = fileArray[0].name;
    this.renderFileTree();
    this.openFile(this.activeFile);
    this.hideFeedback();
  }

  renderFileTree() {
    if (!this.fileTreeEl) return;
    this.fileTreeEl.innerHTML = "";

    const fileNames = Object.keys(this.files);
    if (fileNames.length === 0) {
      this.fileTreeEl.innerHTML = `<div style="padding: 1rem; color: var(--text-muted); font-size: 0.8rem; text-align: center;">No workspace loaded</div>`;
      return;
    }

    fileNames.forEach(name => {
      const item = document.createElement("div");
      item.className = `file-item ${name === this.activeFile ? "active" : ""}`;
      
      let icon = "file-text";
      if (name.toLowerCase() === "dockerfile") icon = "box";
      else if (name.endsWith(".yaml") || name.endsWith(".yml")) icon = "layers";
      else if (name.endsWith(".js") || name.endsWith(".java")) icon = "code-2";
      else if (name.endsWith(".xml")) icon = "settings";

      item.innerHTML = `<i data-lucide="${icon}"></i> <span>${name}</span>`;
      item.addEventListener("click", () => this.switchToFile(name));
      
      this.fileTreeEl.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  switchToFile(filename) {
    if (this.activeFile) {
      this.files[this.activeFile] = this.editorEl.value;
    }
    this.activeFile = filename;
    this.openFile(filename);
    this.renderFileTree();
  }

  openFile(filename) {
    if (!this.editorEl) return;
    this.editorEl.value = this.files[filename] || "";
    
    let icon = "file-text";
    if (filename.toLowerCase() === "dockerfile") icon = "box";
    else if (filename.endsWith(".yaml") || filename.endsWith(".yml")) icon = "layers";
    else if (filename.endsWith(".js") || filename.endsWith(".java")) icon = "code-2";

    if (this.filenameEl) {
      this.filenameEl.innerHTML = `<i data-lucide="${icon}"></i> ${filename}`;
      if (window.lucide) window.lucide.createIcons();
    }
    
    // Update build button text
    if (this.buildBtnEl) {
      if (filename.toLowerCase() === "compose.yaml" || filename.toLowerCase() === "docker-compose.yml") {
        this.buildBtnEl.innerHTML = `<i data-lucide="play"></i> Compose Up`;
      } else if (filename.toLowerCase() === "dockerfile") {
        this.buildBtnEl.innerHTML = `<i data-lucide="play"></i> Build Image`;
      } else if (filename.toLowerCase() === "nginx.conf") {
        this.buildBtnEl.innerHTML = `<i data-lucide="shield-check"></i> Cấu hình Gateway`;
      } else {
        this.buildBtnEl.innerHTML = `<i data-lucide="play"></i> Run Code`;
      }
      if (window.lucide) window.lucide.createIcons();
    }
  }

  showFeedback(text, type = "success") {
    if (!this.feedbackEl) return;
    this.feedbackEl.className = `feedback-panel ${type}`;
    this.feedbackEl.innerHTML = `<strong>${type === "success" ? "SUCCESS" : "ERROR"}:</strong> ${text}`;
    this.feedbackEl.classList.remove("hidden");
  }

  hideFeedback() {
    if (this.feedbackEl) this.feedbackEl.classList.add("hidden");
  }

  runBuild() {
    this.showFeedback("Processing execution...", "info");
    
    setTimeout(() => {
      if (!this.activeFile) {
        this.showFeedback("No open file to build.", "error");
        return;
      }

      const content = this.editorEl.value;
      this.files[this.activeFile] = content;

      if (window.appManager) {
        const isCorrect = window.appManager.checkPracticeState("editor", content);
        if (isCorrect) {
          if (this.activeFile.toLowerCase() === "dockerfile") {
            this.showFeedback("Docker build successful. Image 'my-app:latest' was created successfully!", "success");
            // Add virtual image to docker engine
            if (window.appManager.terminal) {
              window.appManager.terminal.images.push({
                id: Math.random().toString(36).substring(2, 10),
                name: "my-app:latest",
                tag: "latest",
                size: "45.2 MB",
                created: "Just now"
              });
              window.appManager.updateDockerDesktop();
            }
          } else if (this.activeFile.toLowerCase() === "compose.yaml") {
            this.showFeedback("Docker Compose Up completed. Multi-container service group started successfully!", "success");
            
            // Add services to virtual docker engine
            if (window.appManager.terminal) {
              const term = window.appManager.terminal;
              if (!term.containers.some(c => c.name === "app-db")) {
                term.containers.push({ id: "db5432a1", name: "app-db", image: "postgres:15-alpine", status: "running", ports: "5432:5432" });
              }
              if (!term.containers.some(c => c.name === "app-backend")) {
                term.containers.push({ id: "be8080a2", name: "app-backend", image: "my-app:latest", status: "running", ports: "8080:8080" });
              }
              term.writeLine("Creating network \"app-default\" with the default driver", "success");
              term.writeLine("Creating volume \"app_pgdata\" with local driver", "success");
              term.writeLine("Creating app-db ... done", "success");
              term.writeLine("Creating app-backend ... done", "success");
              
              window.appManager.updateDockerDesktop();
              window.appManager.updateBrowserPreview("spring-app");
            }
          } else {
            this.showFeedback("Code compiled and executed smoothly.", "success");
          }
        } else {
          // Provide custom suggestions based on active level
          let errorMsg = "Build failed. The file structure or syntax does not match the exercise requirements.";
          const currentTopic = window.appManager.getCurrentTopic();
          if (currentTopic && currentTopic.hints) {
            errorMsg += `<br><span style="color:var(--text-secondary); margin-top:5px; display:block;">Hint: ${currentTopic.hints[0]}</span>`;
          }
          this.showFeedback(errorMsg, "error");
        }
      }
    }, 600);
  }
}
