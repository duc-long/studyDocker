/**
 * Main Application Orchestrator
 */
class AppManager {
  constructor() {
    this.currentLevelIdx = 0;
    this.currentTopicIdx = 0;
    this.points = 0;
    this.streak = 1;
    this.completedTopics = new Set(JSON.parse(localStorage.getItem("docker_completed_topics") || "[]"));
    this.points = parseInt(localStorage.getItem("docker_points") || "0");
    
    // Components
    this.terminal = null;
    this.editor = null;
    this.quiz = null;
    
    // DevOps Escape Room State
    this.escapeRoomActive = false;
    this.escapeRoomStep = 1;
    this.escapeRoomTimeLeft = 600;
    this.escapeRoomInterval = null;
    this.achievementTimeout = null;
    
    this.init();
  }

  init() {
    // 1. Initialize Components
    this.terminal = new VirtualTerminal("terminal-output", "terminal-input");
    this.editor = new VirtualEditor("code-editor", "vscode-file-tree", "editor-filename", "btn-build");
    this.quiz = new QuizComponent("quiz-container");
    
    // 2. Setup Events
    this.initEvents();
    
    // 3. Render Navigation and load first topic
    this.renderRoadmap();
    this.loadActiveTopic();
    this.updateStats();
    
    // 4. Initial update of Docker Desktop
    this.updateDockerDesktop();
  }

  initEvents() {
    // Clear terminal button
    const clearBtn = document.getElementById("btn-clear-terminal");
    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        if (this.terminal) {
          this.terminal.clear();
          this.terminal.writeLine("Terminal cleared.", "success");
          this.terminal.inputEl.focus();
        }
      });
    }

    // Tab toggling
    const tabs = document.querySelectorAll(".panel-tabs .tab");
    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        const targetId = tab.getAttribute("data-target");
        document.querySelectorAll(".view-pane").forEach(pane => {
          pane.classList.remove("active");
        });
        document.getElementById(targetId).classList.add("active");
        
        // Auto focus input if terminal tab
        if (targetId === "terminal-view" && this.terminal) {
          setTimeout(() => this.terminal.inputEl.focus(), 50);
        }
      });
    });

    // Theme toggle
    const themeBtn = document.getElementById("theme-toggle");
    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        const isDark = document.documentElement.classList.toggle("dark");
        themeBtn.innerHTML = isDark ? `<i data-lucide="sun"></i>` : `<i data-lucide="moon"></i>`;
        localStorage.setItem("theme", isDark ? "dark" : "light");
        if (window.lucide) window.lucide.createIcons();
      });
      
      // Load initial theme
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "light") {
        document.documentElement.classList.remove("dark");
        themeBtn.innerHTML = `<i data-lucide="moon"></i>`;
      }
    }

    // Next / Prev topic navigation buttons
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    
    if (btnNext) {
      btnNext.addEventListener("click", () => this.navigate(1));
    }
    if (btnPrev) {
      btnPrev.addEventListener("click", () => this.navigate(-1));
    }

    // Docker Desktop Sub-Tabs Toggling
    const desktopTabs = document.querySelectorAll(".desktop-sidebar .desktop-nav-item");
    desktopTabs.forEach(tab => {
      tab.addEventListener("click", () => {
        desktopTabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        
        const destId = tab.getAttribute("data-dest");
        document.querySelectorAll(".desktop-tab-content").forEach(tc => {
          tc.classList.remove("active");
        });
        document.getElementById(destId).classList.add("active");
      });
    });
  }

  getCurrentTopic() {
    const level = DOCKER_COURSE_DATA[this.currentLevelIdx];
    if (!level) return null;
    return level.topics[this.currentTopicIdx];
  }

  loadActiveTopic() {
    // Clean up active Escape Room if user switches topics
    if (this.escapeRoomActive) {
      this.stopEscapeRoom(false);
    }
    
    const level = DOCKER_COURSE_DATA[this.currentLevelIdx];
    const topic = level.topics[this.currentTopicIdx];
    
    if (!topic) return;

    // Breadcrumbs
    const breadcrumbs = document.getElementById("breadcrumbs");
    if (breadcrumbs) {
      breadcrumbs.innerHTML = `Lớp ${level.level} <i data-lucide="chevron-right"></i> ${level.title} <i data-lucide="chevron-right"></i> ${topic.title}`;
    }

    // Set topic data
    const titleEl = document.getElementById("lesson-title");
    const badgesEl = document.getElementById("lesson-badges");
    const contentEl = document.getElementById("lesson-content");

    if (titleEl) titleEl.textContent = topic.title;
    
    if (badgesEl) {
      badgesEl.innerHTML = `
        <span class="badge badge-beginner">${topic.difficulty}</span>
        <span class="badge badge-theory">${topic.badge}</span>
      `;
    }

    if (contentEl) {
      contentEl.innerHTML = topic.content;
      
      // Inject Practice Assistant Box for Hint & Answer
      if (topic.practice) {
        const practice = topic.practice;
        const practiceDiv = document.createElement("div");
        practiceDiv.className = "practice-assistant-box";
        practiceDiv.style.marginTop = "2rem";
        practiceDiv.style.padding = "1.5rem";
        practiceDiv.style.borderRadius = "8px";
        practiceDiv.style.background = "rgba(255, 255, 255, 0.03)";
        practiceDiv.style.border = "1px dashed var(--border-color)";
        
        let hintsHtml = "";
        if (practice.hints && practice.hints.length > 0) {
          hintsHtml = `
            <div class="practice-hints-section" style="margin-bottom: 1rem;">
              <button class="btn btn-sm btn-secondary" id="btn-toggle-hint" style="display:flex; align-items:center; gap: 6px; padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color);">
                <i data-lucide="help-circle" style="width:14px; height:14px;"></i> 💡 Hiện gợi ý
              </button>
              <div id="practice-hints-content" class="hidden" style="margin-top:0.8rem; padding:1rem; background:rgba(255,255,255,0.02); border-left: 3px solid var(--accent-blue); border-radius: 4px; font-size:0.9rem;">
                <ul style="margin: 0; padding-left: 1.2rem; line-height: 1.6;">
                  ${practice.hints.map(h => `<li>${h}</li>`).join("")}
                </ul>
              </div>
            </div>
          `;
        }
        
        let solutionHtml = "";
        if (practice.solutions) {
          let displaySol = "";
          if (typeof practice.solutions === "string") {
            displaySol = `<pre style="margin:0; padding:1rem; background:#1e1e2f; color:#a5b4fc; border-radius:6px; font-family:var(--font-mono); font-size:0.85rem; overflow-x:auto; white-space: pre-wrap;"><code>${practice.solutions.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
          } else {
            // If solutions is an object / files list
            displaySol = Object.keys(practice.solutions).map(filename => `
              <div style="font-size:0.75rem; text-transform:uppercase; font-weight:700; color:var(--text-muted); margin-bottom:0.4rem; display:flex; align-items:center; gap:4px; margin-top:0.5rem;">
                <i data-lucide="file-code" style="width:12px; height:12px;"></i> ${filename}
              </div>
              <pre style="margin:0 0 1rem 0; padding:1rem; background:#1e1e2f; color:#a5b4fc; border-radius:6px; font-family:var(--font-mono); font-size:0.85rem; overflow-x:auto; white-space: pre-wrap;"><code>${practice.solutions[filename].replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>
            `).join("");
          }

          solutionHtml = `
            <div class="practice-solutions-section">
              <button class="btn btn-sm btn-secondary" id="btn-toggle-solution" style="display:flex; align-items:center; gap: 6px; padding: 6px 12px; background: rgba(255,255,255,0.05); border: 1px solid var(--border-color);">
                <i data-lucide="key" style="width:14px; height:14px;"></i> 🔑 Xem đáp án
              </button>
              <div id="practice-solution-content" class="hidden" style="margin-top:0.8rem; padding:1rem; background:rgba(255,255,255,0.02); border-left: 3px solid var(--accent-purple); border-radius: 4px; font-size:0.9rem;">
                <div style="margin-bottom:0.8rem; font-weight:500; color:var(--text-color);">Hãy tham khảo đáp án dưới đây và tự tay viết vào ô tương tác bên phải nhé:</div>
                ${displaySol}
              </div>
            </div>
          `;
        }
        
        practiceDiv.innerHTML = `
          <h3 style="margin-top:0; margin-bottom: 0.8rem; font-size: 1.1rem; display:flex; align-items:center; gap:8px; color:var(--accent-blue);">
            <i data-lucide="graduation-cap"></i> Trợ Lý Thực Hành Docker
          </h3>
          <p style="margin: 0 0 1rem 0; font-size: 0.9rem; color: var(--text-muted);">
            Hoàn thành phần thực hành ở bảng tương tác bên phải. Nhấn vào Gợi ý hoặc Đáp án dưới đây để tham khảo.
          </p>
          ${hintsHtml}
          ${solutionHtml}
        `;
        
        contentEl.appendChild(practiceDiv);
        
        // Wire up events
        const hintBtn = practiceDiv.querySelector("#btn-toggle-hint");
        const hintCont = practiceDiv.querySelector("#practice-hints-content");
        if (hintBtn && hintCont) {
          hintBtn.addEventListener("click", () => {
            const isHidden = hintCont.classList.toggle("hidden");
            hintBtn.innerHTML = isHidden ? 
              `<i data-lucide="help-circle" style="width:14px; height:14px;"></i> 💡 Hiện gợi ý` :
              `<i data-lucide="chevron-up" style="width:14px; height:14px;"></i> 📋 Thu gọn gợi ý`;
            if (window.lucide) window.lucide.createIcons();
          });
        }
        
        const solBtn = practiceDiv.querySelector("#btn-toggle-solution");
        const solCont = practiceDiv.querySelector("#practice-solution-content");
        if (solBtn && solCont) {
          solBtn.addEventListener("click", () => {
            const isHidden = solCont.classList.toggle("hidden");
            solBtn.innerHTML = isHidden ? 
              `<i data-lucide="key" style="width:14px; height:14px;"></i> 🔑 Xem đáp án` :
              `<i data-lucide="chevron-up" style="width:14px; height:14px;"></i> 📋 Ẩn đáp án`;
            if (window.lucide) window.lucide.createIcons();
          });
        }
      }
    }

    // Set active topic highlighting in sidebar
    document.querySelectorAll(".nav-item").forEach(item => {
      item.classList.remove("active");
    });
    const sidebarItem = document.getElementById(`nav-item-${topic.id}`);
    if (sidebarItem) sidebarItem.classList.add("active");

    // Load practice state or quiz
    this.quiz.loadQuiz(topic.quiz);
    
    if (topic.practice) {
      if (topic.practice.type === "editor" || topic.practice.type === "pipeline") {
        this.editor.loadFiles(topic.practice.editorFiles);
        // Switch tab to VSCode Editor
        this.switchTab("editor-view");
        
        // Add pipeline compile tools if Level 9 final project
        this.addIDECommitButton(topic.practice.type === "pipeline");
      } else if (topic.practice.type === "terminal") {
        this.switchTab("terminal-view");
        this.terminal.writeLine(`\n💡 THỰC HÀNH: ${topic.practice.instructions}`, "success");
      } else if (topic.practice.type === "escape-room") {
        // Prepare Nginx configuration file workspace in background but switch to terminal!
        this.editor.loadFiles([
          {
            name: "nginx.conf",
            content: `events {}
http {
    # CẤU HÌNH GATEWAY CHẶN IP HACKER
    # Hãy thêm lệnh 'deny 198.51.100.42;' ngay dưới dòng này để chặn hacker:
    
    server {
        listen 80;
        location / {
            proxy_pass http://spring-backend:8080;
        }
    }
}`
          }
        ]);
        
        this.switchTab("terminal-view");
        
        // Bind start button
        setTimeout(() => {
          const startBtn = document.getElementById("btn-start-escape-room");
          if (startBtn) {
            const newStartBtn = startBtn.cloneNode(true);
            startBtn.parentNode.replaceChild(newStartBtn, startBtn);
            newStartBtn.addEventListener("click", () => this.startEscapeRoom());
            if (window.lucide) window.lucide.createIcons();
          }
        }, 100);
      }
    } else {
      this.switchTab("quiz-view");
    }

    // Update navigation buttons enabled/disabled status
    const btnPrev = document.getElementById("btn-prev");
    const btnNext = document.getElementById("btn-next");
    if (btnPrev) btnPrev.disabled = (this.currentLevelIdx === 0 && this.currentTopicIdx === 0);
    if (btnNext) {
      const isLast = (this.currentLevelIdx === DOCKER_COURSE_DATA.length - 1 &&
                      this.currentTopicIdx === DOCKER_COURSE_DATA[this.currentLevelIdx].topics.length - 1);
      btnNext.innerHTML = isLast ? `Hoàn thành khóa học <i data-lucide="award"></i>` : `Tiếp theo <i data-lucide="arrow-right"></i>`;
    }

    // Rerender Lucide Icons on layout updates
    if (window.lucide) window.lucide.createIcons();
    
    // Auto scroll top inside lesson panel
    const lessonBody = document.getElementById("lesson-content");
    if (lessonBody) lessonBody.parentElement.scrollTop = 0;
  }

  addIDECommitButton(isPipeline) {
    const editorHeader = document.querySelector(".editor-header");
    if (!editorHeader) return;
    
    // Remove existing git button if any
    const existingGitBtn = document.getElementById("btn-git-push");
    if (existingGitBtn) existingGitBtn.remove();
    
    if (isPipeline) {
      const gitBtn = document.createElement("button");
      gitBtn.id = "btn-git-push";
      gitBtn.className = "btn btn-sm btn-secondary";
      gitBtn.style.backgroundColor = "var(--accent-purple)";
      gitBtn.style.color = "white";
      gitBtn.innerHTML = `<i data-lucide="git-commit"></i> Git Commit & Push`;
      
      gitBtn.addEventListener("click", () => this.runSimulatedPipeline());
      
      // Insert next to build button
      editorHeader.appendChild(gitBtn);
      if (window.lucide) window.lucide.createIcons();
    }
  }

  switchTab(tabId) {
    const tabBtn = document.querySelector(`.panel-tabs .tab[data-target="${tabId}"]`);
    if (tabBtn) tabBtn.click();
  }

  navigate(dir) {
    let newLevel = this.currentLevelIdx;
    let newTopic = this.currentTopicIdx + dir;
    
    if (newTopic < 0) {
      // Go to previous level
      newLevel--;
      if (newLevel >= 0) {
        newTopic = DOCKER_COURSE_DATA[newLevel].topics.length - 1;
      } else {
        return; // out of range
      }
    } else if (newTopic >= DOCKER_COURSE_DATA[newLevel].topics.length) {
      // Go to next level
      newLevel++;
      if (newLevel < DOCKER_COURSE_DATA.length) {
        newTopic = 0;
      } else {
        // Last topic completed, trigger certificate/congrats
        this.unlockAchievement("Master DevOps & Docker Certified!", "icon-gold");
        return;
      }
    }
    
    this.currentLevelIdx = newLevel;
    this.currentTopicIdx = newTopic;
    this.loadActiveTopic();
  }

  renderRoadmap() {
    const nav = document.getElementById("roadmap-nav");
    if (!nav) return;
    nav.innerHTML = "";

    DOCKER_COURSE_DATA.forEach((lvl, lvlIdx) => {
      const container = document.createElement("div");
      container.className = "nav-level";
      
      container.innerHTML = `
        <div class="nav-level-header">Level ${lvl.level}: ${lvl.title}</div>
      `;

      lvl.topics.forEach((top, topIdx) => {
        const item = document.createElement("a");
        item.className = "nav-item";
        item.id = `nav-item-${top.id}`;
        
        const isCompleted = this.completedTopics.has(top.id);
        if (isCompleted) item.classList.add("completed");
        
        let iconType = "book-open";
        if (top.badge === "Practice") iconType = "terminal";
        else if (top.badge === "Quiz") iconType = "help-circle";

        item.innerHTML = `
          <i data-lucide="${isCompleted ? 'check-circle' : iconType}" class="icon"></i>
          <span>${top.title}</span>
        `;
        
        item.addEventListener("click", (e) => {
          e.preventDefault();
          this.currentLevelIdx = lvlIdx;
          this.currentTopicIdx = topIdx;
          this.loadActiveTopic();
        });

        container.appendChild(item);
      });
      
      nav.appendChild(container);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  checkPracticeState(type, value) {
    const topic = this.getCurrentTopic();
    if (!topic) return false;
    
    let isSuccess = false;
    const practice = topic.practice;
    
    if (type === "quiz") {
      // Quiz validation (handles both theory and practice quizzes)
      if (topic.quiz && topic.quiz[0] && topic.quiz[0].correct === value) {
        isSuccess = true;
      }
    } else if (practice) {
      if (type === "terminal" && practice.type === "terminal") {
        // Validate terminal command
        if (practice.expectedState.command) {
          // Clean both command strings to compare
          const cleanVal = value.replace(/\s+/g, " ").trim().toLowerCase();
          const cleanExp = practice.expectedState.command.replace(/\s+/g, " ").trim().toLowerCase();
          if (cleanVal === cleanExp) {
            isSuccess = true;
          }
        }
      } else if (type === "editor" && practice.type === "editor") {
        // Validate edited file content
        if (practice.expectedState.file && practice.expectedState.contains) {
          isSuccess = practice.expectedState.contains.every(keyword => {
            return value.toLowerCase().includes(keyword.toLowerCase());
          });
        }
      } else if (practice.type === "escape-room") {
        if (type === "editor") {
          if (this.escapeRoomStep === 5) {
            const hasDeny = value.includes("deny 198.51.100.42;");
            if (hasDeny) {
              isSuccess = true;
              this.stopEscapeRoom(true);
            }
          }
        }
      }
    }

    if (isSuccess) {
      this.markTopicCompleted(topic.id);
    }
    
    return isSuccess;
  }

  markTopicCompleted(topicId) {
    if (this.completedTopics.has(topicId)) return; // already completed
    
    this.completedTopics.add(topicId);
    localStorage.setItem("docker_completed_topics", JSON.stringify(Array.from(this.completedTopics)));
    
    // Reward points
    this.points += 100;
    localStorage.setItem("docker_points", this.points.toString());
    
    this.updateStats();
    
    // Update sidebar indicator
    const sidebarItem = document.getElementById(`nav-item-${topicId}`);
    if (sidebarItem) {
      sidebarItem.classList.add("completed");
      const icon = sidebarItem.querySelector(".icon");
      if (icon) {
        icon.setAttribute("data-lucide", "check-circle");
        if (window.lucide) window.lucide.createIcons();
      }
    }

    // Trigger achievement animation
    const topic = this.getCurrentTopic();
    this.unlockAchievement(`Đã mở khóa: ${topic ? topic.title.split(".")[1] : "Chủ đề mới"}`);
  }

  updateStats() {
    // Points
    const ptsEl = document.getElementById("user-points");
    if (ptsEl) ptsEl.textContent = this.points;
    
    // Progress calculation
    let totalTopics = 0;
    DOCKER_COURSE_DATA.forEach(l => totalTopics += l.topics.length);
    const progressPercent = Math.min(100, Math.round((this.completedTopics.size / totalTopics) * 100));
    
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");
    
    if (progressFill) progressFill.style.width = `${progressPercent}%`;
    if (progressText) progressText.textContent = `${progressPercent}%`;
  }

  unlockAchievement(title, extraClass = "") {
    const modal = document.getElementById("achievement-modal");
    const modalText = document.getElementById("achievement-text");
    
    if (modal && modalText) {
      modalText.textContent = title;
      modal.classList.remove("hidden");
      
      // Visual flair
      const icon = modal.querySelector(".achievement-icon");
      if (icon) {
        if (extraClass) icon.className = `achievement-icon ${extraClass}`;
        else icon.className = "achievement-icon";
      }

      // Automatically hide after 3.5 seconds without forcing clicks
      if (this.achievementTimeout) {
        clearTimeout(this.achievementTimeout);
      }
      
      const content = modal.querySelector(".modal-content");
      if (content) {
        content.style.animation = "slideInRight 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
      }
      
      this.achievementTimeout = setTimeout(() => {
        if (content) {
          content.style.animation = "fadeOut 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards";
          setTimeout(() => {
            modal.classList.add("hidden");
          }, 400);
        } else {
          modal.classList.add("hidden");
        }
      }, 3500);
    }
  }

  // Docker Desktop Sync methods
  updateDockerDesktop() {
    if (!this.terminal) return;
    
    const term = this.terminal;
    
    // Update container count pill
    const countPill = document.getElementById("desktop-running-count");
    const runningCount = term.containers.filter(c => c.status === "running").length;
    if (countPill) countPill.textContent = `${runningCount} running`;
    
    // Render Containers
    const containerList = document.getElementById("desktop-containers-list");
    if (containerList) {
      containerList.innerHTML = "";
      if (term.containers.length === 0) {
        containerList.innerHTML = `<tr><td colspan="5" style="text-align:center; color:var(--text-muted);">No running or stopped containers</td></tr>`;
      } else {
        term.containers.forEach(c => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td><strong>${c.name}</strong></td>
            <td><code>${c.image}</code></td>
            <td>
              <span class="desktop-status-badge ${c.status}">
                <span class="indicator-dot"></span>${c.status}
              </span>
            </td>
            <td><code>${c.ports || "-"}</code></td>
            <td class="desktop-actions-cell">
              ${c.status === "running" ? 
                `<button class="btn-desktop-action action-stop" onclick="window.appManager.controlContainer('${c.name}', 'stop')" title="Stop"><i data-lucide="square"></i></button>` :
                `<button class="btn-desktop-action action-start" onclick="window.appManager.controlContainer('${c.name}', 'start')" title="Start"><i data-lucide="play"></i></button>`
              }
              <button class="btn-desktop-action action-delete" onclick="window.appManager.controlContainer('${c.name}', 'delete')" title="Delete"><i data-lucide="trash-2"></i></button>
            </td>
          `;
          containerList.appendChild(row);
        });
      }
    }
    
    // Render Images
    const imageList = document.getElementById("desktop-images-list");
    if (imageList) {
      imageList.innerHTML = "";
      term.images.forEach(img => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${img.name}</strong></td>
          <td><code>${img.id}</code></td>
          <td>${img.created}</td>
          <td><code>${img.size}</code></td>
          <td class="desktop-actions-cell">
            <button class="btn-desktop-action action-start" onclick="window.appManager.runContainerFromImage('${img.name}')" title="Run Container"><i data-lucide="play"></i></button>
            <button class="btn-desktop-action action-delete" onclick="window.appManager.deleteImage('${img.id}')" title="Delete Image"><i data-lucide="trash-2"></i></button>
          </td>
        `;
        imageList.appendChild(row);
      });
    }

    // Render Volumes
    const volumeList = document.getElementById("desktop-volumes-list");
    if (volumeList) {
      volumeList.innerHTML = "";
      term.volumes.forEach(v => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${v.name}</strong></td>
          <td>${v.driver}</td>
          <td>${v.size || "0 B"}</td>
          <td class="desktop-actions-cell">
            <button class="btn-desktop-action action-delete" onclick="window.appManager.deleteVolume('${v.name}')" title="Delete Volume"><i data-lucide="trash-2"></i></button>
          </td>
        `;
        volumeList.appendChild(row);
      });
    }

    // Render Networks
    const networkList = document.getElementById("desktop-networks-list");
    if (networkList) {
      networkList.innerHTML = "";
      term.networks.forEach(n => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td><strong>${n.name}</strong></td>
          <td><code>${n.driver}</code></td>
          <td>${n.scope}</td>
        `;
        networkList.appendChild(row);
      });
    }

    if (window.lucide) window.lucide.createIcons();
  }

  // Graphical actions inside Docker Desktop Simulator
  controlContainer(name, action) {
    const term = this.terminal;
    const c = term.containers.find(x => x.name === name);
    if (!c) return;

    if (action === "stop") {
      c.status = "stopped";
      term.writeLine(`[Docker Desktop] Stopped container: ${name}`, "success");
    } else if (action === "start") {
      c.status = "running";
      term.writeLine(`[Docker Desktop] Started container: ${name}`, "success");
    } else if (action === "delete") {
      const idx = term.containers.findIndex(x => x.name === name);
      term.containers.splice(idx, 1);
      term.writeLine(`[Docker Desktop] Deleted container: ${name}`, "success");
    }
    
    this.updateDockerDesktop();
    
    // Sync browser mockup
    this.updateBrowserPreview(term.containers.some(c => c.status === "running" && c.ports && c.ports.includes("8080")) ? "spring-app" : null);
  }

  runContainerFromImage(imgName) {
    if (!this.terminal) return;
    this.terminal.execute(`docker run -d -p 8080:80 ${imgName}`);
    this.switchTab("terminal-view");
  }

  deleteImage(id) {
    if (!this.terminal) return;
    this.terminal.execute(`docker rmi ${id}`);
  }

  deleteVolume(name) {
    if (!this.terminal) return;
    const idx = this.terminal.volumes.findIndex(v => v.name === name);
    if (idx !== -1) {
      this.terminal.volumes.splice(idx, 1);
      this.terminal.writeLine(`[Docker Desktop] Deleted Volume: ${name}`, "success");
      this.updateDockerDesktop();
    }
  }

  // Sync Browser Mockup Preview
  updateBrowserPreview(imageName) {
    const previewEl = document.getElementById("browser-preview");
    const urlEl = document.querySelector(".browser-url");
    if (!previewEl) return;

    if (!imageName) {
      urlEl.textContent = "http://localhost:8080";
      previewEl.innerHTML = `
        <div class="empty-state">
          <i data-lucide="globe"></i>
          <p>No container listening on port 8080. Try running a server with '-p 8080:80'!</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    urlEl.textContent = "http://localhost:8080";
    
    if (imageName.includes("nginx")) {
      previewEl.innerHTML = `
        <div style="padding:2rem; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#ffffff; color:#333; text-align:center;">
          <h1 style="color:#009688; margin-bottom:1rem; font-size: 2.2rem;">Welcome to Nginx!</h1>
          <p style="font-size:1.1rem; max-width:500px; color:#555;">The web server is successfully running in a virtual Docker Container. No virtual host OS issues encountered!</p>
          <div style="margin-top:2rem; padding:0.5rem 1rem; background:#e0f2f1; color:#00796b; font-weight:600; border-radius:4px; font-size:0.85rem;">Server status: 200 OK</div>
        </div>
      `;
    } else if (imageName.includes("spring-app") || imageName.includes("backend")) {
      previewEl.innerHTML = `
        <div style="padding:2rem; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#f4f6f9; color:#2d3748; text-align:center; font-family:sans-serif;">
          <div style="width:64px; height:64px; border-radius:50%; background:#4caf50; display:flex; align-items:center; justify-content:center; color:white; font-size:2rem; margin-bottom:1rem; box-shadow:0 4px 10px rgba(76,175,80,0.3);">🍃</div>
          <h1 style="color:#2e7d32; font-size: 1.8rem; margin-bottom:0.5rem;">Spring Boot 3 REST App</h1>
          <p style="font-size:0.95rem; color:#4a5568; max-width:400px; margin-bottom:1rem;">API endpoints up and running perfectly on JDK 21 Alpine container runtime!</p>
          <div style="background:white; border:1px solid #e2e8f0; padding:0.8rem; border-radius:6px; font-family:monospace; font-size:0.8rem; text-align:left; width:100%; max-width:350px;">
            <span style="color:#3182ce;">GET /api/v1/health</span> ➜ <span style="color:#38a169;">{"status": "UP", "database": "PostgreSQL Connected"}</span>
          </div>
        </div>
      `;
    } else {
      previewEl.innerHTML = `
        <div style="padding:2rem; width:100%; height:100%; display:flex; flex-direction:column; align-items:center; justify-content:center; background:#ffffff; color:#333; text-align:center;">
          <div style="font-size:3rem; margin-bottom:1rem;">🚀</div>
          <h1 style="color:var(--accent-blue);">Application Container Live</h1>
          <p style="font-size:1rem; color:#666;">Serving requests on port 8080 from Docker container network.</p>
        </div>
      `;
    }
  }

  // Simulated GitHub Actions CI/CD Pipeline
  runSimulatedPipeline() {
    this.switchTab("pipeline-view");
    
    const logsEl = document.getElementById("pipeline-logs-output");
    const gradingEl = document.getElementById("pipeline-grading");
    const scoreText = document.getElementById("grading-score-text");
    const statusTitle = document.getElementById("grading-status-title");
    const statusDesc = document.getElementById("grading-status-desc");
    const feedbackList = document.getElementById("grading-feedback-list");
    const timerEl = document.getElementById("pipeline-timer");
    
    if (!logsEl) return;
    
    // Reset pipeline visuals
    gradingEl.classList.add("hidden");
    document.querySelectorAll(".pipeline-node").forEach(node => {
      node.className = "pipeline-node";
      const status = node.querySelector(".node-status");
      if (status) status.innerHTML = "";
    });
    document.querySelectorAll(".pipeline-connector").forEach(conn => {
      conn.className = "pipeline-connector";
    });
    
    logsEl.innerHTML = "";
    
    let timerSec = 0;
    const interval = setInterval(() => {
      timerSec++;
      const min = String(Math.floor(timerSec / 60)).padStart(2, "0");
      const sec = String(timerSec % 60).padStart(2, "0");
      if (timerEl) timerEl.textContent = `${min}:${sec}`;
    }, 1000);

    const log = (text, type = "") => {
      const line = document.createElement("div");
      line.className = `log-line ${type}`;
      line.innerHTML = `[${new Date().toLocaleTimeString()}] ${text}`;
      logsEl.appendChild(line);
      logsEl.scrollTop = logsEl.scrollHeight;
    };

    // Stage 1: Trigger Git Commit
    const runStage1 = () => {
      const node = document.getElementById("node-trigger");
      node.classList.add("running");
      node.querySelector(".node-status").innerHTML = `<i data-lucide="loader"></i>`;
      if (window.lucide) window.lucide.createIcons();
      
      log("🔔 Git push detected on branch 'main'. Initiating Workflow: 'DevOps CI-CD Pipeline'...", "log-blue");
      log("Runner: Ubuntu 22.04 LTS (Github-hosted runner #528) is spawning...", "log-dim");
      
      setTimeout(() => {
        node.classList.remove("running");
        node.classList.add("success");
        node.querySelector(".node-status").innerHTML = `<i data-lucide="check"></i>`;
        document.getElementById("conn-1").classList.add("success");
        if (window.lucide) window.lucide.createIcons();
        log("✅ Stage 'Git Push' successfully checkout code from master repository. SHA: 82ab912f", "log-green");
        runStage2();
      }, 1500);
    };

    // Stage 2: Unit Test
    const runStage2 = () => {
      const node = document.getElementById("node-test");
      node.classList.add("running");
      node.querySelector(".node-status").innerHTML = `<i data-lucide="loader"></i>`;
      document.getElementById("conn-1").classList.add("running");
      if (window.lucide) window.lucide.createIcons();
      
      log("⚙️ Running Java Maven Unit Tests: mvn test...", "log-blue");
      log("Maven version: 3.9.6, JDK: 21.0.2 (Temurin)", "log-dim");
      
      setTimeout(() => {
        // Read test file content from editor cache to see if unit tests should pass or fail
        const testContent = this.editor.files["src/test/java/AppTest.java"] || "";
        const testFails = testContent.includes("assertTrue(false)");
        
        if (testFails) {
          node.classList.remove("running");
          node.classList.add("failed");
          node.querySelector(".node-status").innerHTML = `<i data-lucide="x"></i>`;
          clearInterval(interval);
          if (window.lucide) window.lucide.createIcons();
          
          log("❌ JUnit test run failed!", "log-red");
          log("AppTest.java:10 -> expected: true but was: false", "log-red");
          log("Pipeline aborted due to unit test failure! Environment protection block triggered.", "log-red");
          
          this.showFinalGrading(40, false, ["Unit tests failed! Bạn đã sửa assertTrue(false) khiến JUnit compile fail.", "Hãy kiểm tra lại file AppTest.java và sửa thành assertTrue(true) để test pass!"]);
        } else {
          node.classList.remove("running");
          node.classList.add("success");
          node.querySelector(".node-status").innerHTML = `<i data-lucide="check"></i>`;
          document.getElementById("conn-2").classList.add("success");
          if (window.lucide) window.lucide.createIcons();
          
          log("Running: AppTest.java... Context loads successfully.", "log-dim");
          log("[INFO] Tests run: 1, Failures: 0, Errors: 0, Skipped: 0", "log-green");
          log("✅ Stage 'Unit Test' passed smoothly.", "log-green");
          runStage3();
        }
      }, 2500);
    };

    // Stage 3: Docker Build
    const runStage3 = () => {
      const node = document.getElementById("node-build");
      node.classList.add("running");
      node.querySelector(".node-status").innerHTML = `<i data-lucide="loader"></i>`;
      document.getElementById("conn-2").classList.add("running");
      if (window.lucide) window.lucide.createIcons();
      
      log("🐳 Executing Docker Build: docker build -t dockerhub-user/spring-app:latest ...", "log-blue");
      
      setTimeout(() => {
        const dockerfileContent = this.editor.files["Dockerfile"] || "";
        const isMultiStage = dockerfileContent.includes("AS builder") || dockerfileContent.includes("FROM eclipse-temurin:21-jre-alpine");
        
        if (!isMultiStage) {
          log("⚠️ Warning: Dockerfile is not using Multi-stage optimizations. Performance degradation expected.", "log-yellow");
        }
        
        log("Step 1/8 : FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder ... Using cached layer", "log-dim");
        log("Step 4/8 : RUN mvn clean package -DskipTests ... Compiling Jar file", "log-dim");
        log("Step 6/8 : FROM eclipse-temurin:21-jre-alpine ... Pulled base runtime", "log-dim");
        log("Step 8/8 : ENTRYPOINT [\"java\", \"-jar\", \"app.jar\"] ... Completed", "log-dim");
        
        node.classList.remove("running");
        node.classList.add("success");
        node.querySelector(".node-status").innerHTML = `<i data-lucide="check"></i>`;
        document.getElementById("conn-3").classList.add("success");
        if (window.lucide) window.lucide.createIcons();
        
        log("✅ Stage 'Docker Build' successfully created image. Size: 118MB (Optimized)", "log-green");
        runStage4();
      }, 2500);
    };

    // Stage 4: Push to Registry
    const runStage4 = () => {
      const node = document.getElementById("node-push");
      node.classList.add("running");
      node.querySelector(".node-status").innerHTML = `<i data-lucide="loader"></i>`;
      document.getElementById("conn-3").classList.add("running");
      if (window.lucide) window.lucide.createIcons();
      
      log("🌐 Authenticating and Pushing to Docker Hub...", "log-blue");
      log("Login successfully using secrets.DOCKER_USERNAME", "log-dim");
      
      setTimeout(() => {
        log("The push refers to repository [docker.io/dockerhub-user/spring-app]", "log-dim");
        log("f7f1e58e317c: Pushed", "log-dim");
        log("a5b4c3d2f9a1: Pushed", "log-dim");
        log("latest: digest: sha256:7f42c13... size: 1572", "log-dim");
        
        node.classList.remove("running");
        node.classList.add("success");
        node.querySelector(".node-status").innerHTML = `<i data-lucide="check"></i>`;
        document.getElementById("conn-4").classList.add("success");
        if (window.lucide) window.lucide.createIcons();
        
        log("✅ Stage 'Push Registry' pushed tag :latest into public repository.", "log-green");
        runStage5();
      }, 2000);
    };

    // Stage 5: Deploy VPS & Health Check
    const runStage5 = () => {
      const node = document.getElementById("node-deploy");
      node.classList.add("running");
      node.querySelector(".node-status").innerHTML = `<i data-lucide="loader"></i>`;
      document.getElementById("conn-4").classList.add("running");
      if (window.lucide) window.lucide.createIcons();
      
      log("🚀 Connecting to VPS target (128.199.200.11) via SSH keys...", "log-blue");
      log("Executing docker-compose pull && docker-compose up -d...", "log-dim");
      
      setTimeout(() => {
        log("Pulling backend ... done", "log-dim");
        log("Recreating app-backend ... done", "log-dim");
        log("⏳ Performing API Health Check at http://128.199.200.11:8080/api/v1/health...", "log-yellow");
        
        setTimeout(() => {
          log("Health Check endpoint returned status 200 OK!", "log-green");
          log("Pipeline runs finished with SUCCESS configuration status.", "log-green");
          
          node.classList.remove("running");
          node.classList.add("success");
          node.querySelector(".node-status").innerHTML = `<i data-lucide="check"></i>`;
          clearInterval(interval);
          if (window.lucide) window.lucide.createIcons();
          
          // Complete and grade
          const workflowContent = this.editor.files[".github/workflows/deploy.yml"] || "";
          const dockerfileContent = this.editor.files["Dockerfile"] || "";
          
          let score = 100;
          let feedbacks = [
            "GitHub Actions workflow .github/workflows/deploy.yml khai báo đúng chuẩn.",
            "Dockerfile sử dụng Multi-stage builds gọn nhẹ, tối ưu bảo mật (118MB).",
            "Môi trường Unit Test Spring Boot pass thành công (JUnit5).",
            "Health check container trên VPS production phản hồi 200 OK."
          ];
          
          // Add virtual container running to docker engine
          if (this.terminal) {
            this.terminal.containers.push({
              id: "vps9876a",
              name: "prod-spring-backend",
              image: "dockerhub-user/spring-app:latest",
              status: "running",
              ports: "8080:8080"
            });
            this.updateDockerDesktop();
            this.updateBrowserPreview("spring-app");
          }
          
          this.showFinalGrading(score, true, feedbacks);
          
          // Mark topic completed
          const topic = this.getCurrentTopic();
          if (topic) this.markTopicCompleted(topic.id);
          
        }, 1500);
      }, 2000);
    };

    runStage1();
  }

  showFinalGrading(score, isSuccess, feedbacks) {
    const gradingEl = document.getElementById("pipeline-grading");
    const scoreText = document.getElementById("grading-score-text");
    const statusTitle = document.getElementById("grading-status-title");
    const statusDesc = document.getElementById("grading-status-desc");
    const feedbackList = document.getElementById("grading-feedback-list");
    
    if (!gradingEl) return;
    
    scoreText.textContent = score;
    statusTitle.textContent = isSuccess ? "Pipeline Build Thành Công! 🎉" : "Pipeline Bị Lỗi Hệ Thống! ⚠️";
    statusDesc.textContent = isSuccess ? 
      "Toàn bộ ứng dụng Fullstack đã được đóng gói và deploy thành công lên Server!" : 
      "Hệ thống tự động phát hiện lỗi biên dịch hoặc lỗi kiểm thử trong pipeline.";
      
    feedbackList.innerHTML = "";
    feedbacks.forEach(fb => {
      const item = document.createElement("div");
      item.className = `feedback-suggestion ${isSuccess ? 'success-item' : 'error-item'}`;
      item.innerHTML = `<i data-lucide="${isSuccess ? 'check' : 'alert-circle'}"></i> <span>${fb}</span>`;
      feedbackList.appendChild(item);
    });
    
    gradingEl.classList.remove("hidden");
    if (window.lucide) window.lucide.createIcons();
    
    // Auto scroll grading view into viewport
    gradingEl.parentElement.scrollTop = 0;
  }

  // DevOps Escape Room Core Logic
  startEscapeRoom() {
    this.escapeRoomActive = true;
    this.escapeRoomStep = 1;
    this.escapeRoomTimeLeft = 600; // 10 minutes
    
    this.playAlarmSound();
    
    // UI Visual alert: blinking red screen border on full workspace
    const workspace = document.querySelector(".workspace");
    if (workspace) workspace.classList.add("emergency-alert");
    
    this.switchTab("terminal-view");
    
    this.terminal.clear();
    this.terminal.writeLine("🚨 SYSTEM SECURITY WARNING: SYSTEM COMPROMISED!", "error");
    this.terminal.writeLine("-------------------------------------------------", "error");
    this.terminal.writeLine(`[${new Date().toLocaleTimeString()}] WARNING: CPU load exceeds 99.8% on vps-core-node-1.`, "error");
    this.terminal.writeLine(`[${new Date().toLocaleTimeString()}] ALERT: App database connection timeout warnings detected.`, "error");
    this.terminal.writeLine("\n📞 SLACK MESSAGE FROM CEO:", "error");
    this.terminal.writeLine("  'CỨU ANH EM ƠI! Web đang sập rồi, sếp đang gọi cháy máy. Giải cứu server gấp!!!'", "error");
    this.terminal.writeLine("\n👉 Bước 1: Hãy gõ lệnh 'docker stats' để bắt đầu truy vết container lạ đang ngốn CPU...", "success");
    
    // Floating timer overlay inside terminal-view
    let timerEl = document.getElementById("escape-room-timer");
    if (!timerEl) {
      timerEl = document.createElement("div");
      timerEl.id = "escape-room-timer";
      timerEl.className = "escape-room-timer";
      
      const termContainer = document.querySelector(".terminal-container");
      if (termContainer) {
        termContainer.style.position = "relative";
        termContainer.appendChild(timerEl);
      }
    }
    timerEl.classList.remove("hidden");
    
    const updateTimerText = () => {
      const min = String(Math.floor(this.escapeRoomTimeLeft / 60)).padStart(2, "0");
      const sec = String(this.escapeRoomTimeLeft % 60).padStart(2, "0");
      timerEl.innerHTML = `<i data-lucide="shield-alert" class="icon-pulse"></i> GIẢI CỨU SERVER: <span style="font-family:monospace; font-weight:700;">${min}:${sec}</span>`;
      if (window.lucide) window.lucide.createIcons();
    };
    
    updateTimerText();
    
    if (this.escapeRoomInterval) clearInterval(this.escapeRoomInterval);
    this.escapeRoomInterval = setInterval(() => {
      this.escapeRoomTimeLeft--;
      updateTimerText();
      
      if (this.escapeRoomTimeLeft % 3 === 0) {
        this.playAlarmSound();
      }
      
      if (this.escapeRoomTimeLeft <= 0) {
        this.stopEscapeRoom(false);
      }
    }, 1000);
  }

  stopEscapeRoom(isWin) {
    this.escapeRoomActive = false;
    if (this.escapeRoomInterval) {
      clearInterval(this.escapeRoomInterval);
      this.escapeRoomInterval = null;
    }
    
    const workspace = document.querySelector(".workspace");
    if (workspace) workspace.classList.remove("emergency-alert");
    
    const timerEl = document.getElementById("escape-room-timer");
    if (timerEl) timerEl.classList.add("hidden");
    
    if (isWin) {
      this.playVictorySound();
      this.points += 300;
      this.updateStats();
      this.unlockAchievement("🏆 ESCAPE ROOM THÀNH CÔNG: GIẢI CỨU SERVER HOÀN TẤT!", "success-toast");
      
      const topic = this.getCurrentTopic();
      if (topic) this.markTopicCompleted(topic.id);
      
      this.terminal.writeLine("\n=======================================================", "success");
      this.terminal.writeLine("🏆 CHÚC MỪNG: BẠN ĐÃ GIẢI CỨU SERVER THÀNH CÔNG!", "success");
      this.terminal.writeLine("=======================================================", "success");
      this.terminal.writeLine("📞 SLACK MESSAGE FROM CEO:", "success");
      this.terminal.writeLine("  'Tuyệt vời!!! Hệ thống đã hoạt động mượt mà trở lại. Khách hàng khen quá trời!'", "success");
      this.terminal.writeLine("  'Anh sẽ đề xuất thưởng nóng và tăng lương gấp đôi cho em trong kỳ review tới!'", "success");
      this.terminal.writeLine("\n✓ Bạn nhận được +300 XP thưởng capstone. Hãy tiến tới Quiz hoặc bài học tiếp theo!", "success");
    } else {
      if (this.escapeRoomTimeLeft <= 0) {
        this.terminal.writeLine("\n🚨 THỜI GIAN ĐÃ HẾT: SERVER ĐÃ BỊ SẬP HOÀN TOÀN!", "error");
        this.terminal.writeLine("Sếp (Slack): 'Thôi xong! Hệ thống die hẳn rồi. Khách hàng huỷ dịch vụ hàng loạt rồi em ơi...'", "error");
        this.terminal.writeLine("\n👉 Hãy nhấn nút 'KÍCH HOẠT ĐẤU TRƯỜNG DEVOPS ESCAPE ROOM' bên trái để bắt đầu lại từ đầu!", "error");
        this.unlockAchievement("⚠️ ESCAPE ROOM THẤT BẠI: Server sập hoàn toàn!", "error-toast");
      }
    }
  }

  handleEscapeRoomCommand(commandLine) {
    const cmd = commandLine.trim();
    
    if (this.escapeRoomStep === 1) {
      if (cmd === "docker stats") {
        this.terminal.writeLine("CONTAINER ID   NAME          CPU %     MEM USAGE / LIMIT   MEM %     NET I/O");
        this.terminal.writeLine("3a9f2d8c1e7a   hacker-app    99.8%     245MiB / 512MiB     47.8%     12MB / 1.4kB");
        this.terminal.writeLine("db5432a1db89   app-db        0.15%     35MiB / 1024MiB     3.4%      152B / 88B");
        this.terminal.writeLine("be8080a2be42   app-backend   0.20%     120MiB / 1024MiB    11.7%     1.2kB / 542B");
        this.terminal.writeLine("\n🚨 PHÁT HIỆN: Container 'hacker-app' đang ăn sạch CPU hệ thống!", "error");
        this.terminal.writeLine("👉 Bước 2: Hãy chạy lệnh 'docker top hacker-app' để xem tiến trình phá hoại bên trong container.", "success");
        
        this.escapeRoomStep = 2;
        this.unlockAchievement("Bước 1 hoàn thành: Phát hiện container hacker-app!");
        this.points += 50;
        this.updateStats();
        this.playAlarmSound();
        return true;
      } else {
        this.terminal.writeLine("❌ Sai lệnh! Gợi ý: Hãy gõ 'docker stats' để giám sát tài nguyên CPU.", "error");
        return true;
      }
    }
    
    if (this.escapeRoomStep === 2) {
      if (cmd === "docker top hacker-app") {
        this.terminal.writeLine("UID        PID        PPID       C    STIME      TTY        TIME       CMD");
        this.terminal.writeLine("root       4821       4800       98   02:00      ?          00:09:42   /var/tmp/miner --donate-level 5");
        this.terminal.writeLine("root       4835       4800       0    02:00      ?          00:00:01   python3 -m http.server 80");
        this.terminal.writeLine("\n🚨 PHÁT HIỆN: Tiến trình '/var/tmp/miner' (đào coin) đang tàn phá CPU!", "error");
        this.terminal.writeLine("👉 Bước 3: Hãy xóa sổ file thực thi đào coin này bằng lệnh: docker exec -it hacker-app rm -f /var/tmp/miner", "success");
        
        this.escapeRoomStep = 3;
        this.unlockAchievement("Bước 2 hoàn thành: Phát hiện malware /var/tmp/miner!");
        this.points += 50;
        this.updateStats();
        this.playAlarmSound();
        return true;
      } else {
        this.terminal.writeLine("❌ Sai lệnh! Gợi ý: Hãy gõ 'docker top hacker-app' để xem các tiến trình đang chạy bên trong container.", "error");
        return true;
      }
    }
    
    if (this.escapeRoomStep === 3) {
      if (cmd === "docker exec -it hacker-app rm -f /var/tmp/miner") {
        this.terminal.writeLine("Removing malware executable /var/tmp/miner from hacker-app...");
        this.terminal.writeLine("Process killed successfully.");
        this.terminal.writeLine("✓ File /var/tmp/miner deleted.", "success");
        this.terminal.writeLine("\n✅ THÀNH CÔNG: Đã tiêu diệt tiến trình đào coin trộm!", "success");
        this.terminal.writeLine("🚨 CẢNH BÁO: Container hacker-app vẫn không giới hạn tài nguyên và có thể bị hacker hack lại bất kỳ lúc nào!", "error");
        this.terminal.writeLine("👉 Bước 4: Hãy gõ lệnh 'docker update --cpus=\"0.2\" --memory=\"64m\" hacker-app' để khống chế tài nguyên container này.", "success");
        
        this.escapeRoomStep = 4;
        this.unlockAchievement("Bước 3 hoàn thành: Đã xóa file mã độc!");
        this.points += 50;
        this.updateStats();
        this.playAlarmSound();
        return true;
      } else {
        this.terminal.writeLine("❌ Sai lệnh! Gợi ý: Hãy gõ chính xác: docker exec -it hacker-app rm -f /var/tmp/miner", "error");
        return true;
      }
    }
    
    if (this.escapeRoomStep === 4) {
      const cleanCmd = cmd.replace(/['"]/g, "");
      if (cleanCmd === "docker update --cpus=0.2 --memory=64m hacker-app" || cleanCmd === "docker update --cpus 0.2 --memory 64m hacker-app") {
        this.terminal.writeLine("hacker-app");
        this.terminal.writeLine("✓ Container resources successfully limited: CPU max 20%, Memory max 64MB.", "success");
        this.terminal.writeLine("\n✅ THÀNH CÔNG: Đã khống chế tài nguyên container hacker-app thành công!", "success");
        this.terminal.writeLine("🚨 CẢNH BÁO CUỐI: Hacker vẫn đang tiếp tục gửi request tấn công DDoS từ IP '198.51.100.42'!");
        this.terminal.writeLine("👉 Bước 5: Hãy chuyển sang tab 'VSCode IDE', chọn file 'nginx.conf' và thêm dòng 'deny 198.51.100.42;' ở dòng số 5 dưới comment chỉ định. Sau đó nhấn 'Cấu hình Gateway' để hoàn tất giải cứu!", "success");
        
        this.escapeRoomStep = 5;
        this.unlockAchievement("Bước 4 hoàn thành: Đã giới hạn CPU/RAM!");
        this.points += 50;
        this.updateStats();
        this.playAlarmSound();
        
        setTimeout(() => this.switchTab("editor-view"), 1000);
        return true;
      } else {
        this.terminal.writeLine("❌ Sai lệnh! Gợi ý: Hãy gõ chính xác: docker update --cpus=\"0.2\" --memory=\"64m\" hacker-app", "error");
        return true;
      }
    }
    
    if (this.escapeRoomStep === 5) {
      this.terminal.writeLine("🚨 MẠNG BỊ KHÓA: Hacker vẫn đang tấn công! Hãy chuyển sang VSCode IDE để chỉnh sửa nginx.conf chặn IP hacker.", "error");
      return true;
    }
    
    return false;
  }

  playAlarmSound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime);
      gain.gain.setValueAtTime(0.06, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.005, audioCtx.currentTime + 0.25);
      osc.start(audioCtx.currentTime);
      osc.stop(audioCtx.currentTime + 0.25);
    } catch (e) {
      console.log("Audio context blocked or not supported.");
    }
  }

  playVictorySound() {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const now = audioCtx.currentTime;
      const playNote = (freq, start, duration) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.08, start);
        gain.gain.exponentialRampToValueAtTime(0.005, start + duration);
        osc.start(start);
        osc.stop(start + duration);
      };
      playNote(523.25, now, 0.15); // C5
      playNote(659.25, now + 0.15, 0.15); // E5
      playNote(783.99, now + 0.3, 0.15); // G5
      playNote(1046.50, now + 0.45, 0.4); // C6
    } catch (e) {
      console.log(e);
    }
  }
}

// Global modal toggle function
function closeModal(id) {
  const modal = document.getElementById(id);
  if (modal) modal.classList.add("hidden");
}

// Initialize Application on Page Load
document.addEventListener("DOMContentLoaded", () => {
  window.appManager = new AppManager();
});
