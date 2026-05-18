/**
 * Quiz Renderer and Assessor Component
 */
class QuizComponent {
  constructor(containerId) {
    this.containerEl = document.getElementById(containerId);
    this.currentQuiz = null;
    this.selectedOption = null;
  }

  loadQuiz(quizArray) {
    this.selectedOption = null;
    if (!this.containerEl) return;
    
    if (!quizArray || quizArray.length === 0) {
      this.containerEl.innerHTML = `
        <div style="padding: 2rem; text-align: center; color: var(--text-muted);">
          <i data-lucide="help-circle" style="width: 48px; height: 48px; margin-bottom: 1rem; opacity: 0.5;"></i>
          <p>Không có bài trắc nghiệm nào cho bài học này.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Load the first quiz in the array for simplicity
    this.currentQuiz = quizArray[0];
    this.render();
  }

  render() {
    if (!this.containerEl || !this.currentQuiz) return;

    let optionsHTML = "";
    this.currentQuiz.options.forEach((opt, idx) => {
      optionsHTML += `
        <div class="quiz-option" data-index="${idx}" id="quiz-opt-${idx}">
          <span class="option-letter" style="font-weight: 700; color: var(--accent-blue); width: 24px;">${String.fromCharCode(65 + idx)}.</span>
          <span class="option-text">${this.escapeHTML(opt)}</span>
        </div>
      `;
    });

    this.containerEl.innerHTML = `
      <div class="quiz-box" style="animation: fadeIn 0.4s ease;">
        <h3 class="quiz-question" style="font-weight: 600; margin-bottom: 1.5rem; line-height: 1.5;">
          ${this.escapeHTML(this.currentQuiz.question)}
        </h3>
        <div class="quiz-options">
          ${optionsHTML}
        </div>
        <div class="quiz-feedback-box" id="quiz-feedback-box" style="margin-top: 1.5rem; padding: 1.2rem; border-radius: 6px; display: none;">
          <div id="feedback-title" style="font-weight: 700; margin-bottom: 0.5rem; font-size: 1rem;"></div>
          <div id="feedback-explanation" style="font-size: 0.9rem; line-height: 1.5;"></div>
        </div>
      </div>
    `;

    // Attach Click Events
    const options = this.containerEl.querySelectorAll(".quiz-option");
    options.forEach(opt => {
      opt.addEventListener("click", () => {
        const idx = parseInt(opt.getAttribute("data-index"));
        this.selectOption(idx);
      });
    });
  }

  selectOption(index) {
    if (this.selectedOption !== null) return; // Prevent double answers
    
    this.selectedOption = index;
    const correctIndex = this.currentQuiz.correct;
    
    const feedbackBox = document.getElementById("quiz-feedback-box");
    const feedbackTitle = document.getElementById("feedback-title");
    const feedbackExplanation = document.getElementById("feedback-explanation");
    
    const selectedEl = document.getElementById(`quiz-opt-${index}`);
    const correctEl = document.getElementById(`quiz-opt-${correctIndex}`);
    
    if (index === correctIndex) {
      selectedEl.classList.add("correct");
      
      // Styling feedback box
      feedbackBox.style.display = "block";
      feedbackBox.style.backgroundColor = "rgba(16, 185, 129, 0.1)";
      feedbackBox.style.borderLeft = "4px solid var(--accent-green)";
      
      feedbackTitle.innerHTML = `<i data-lucide="check-circle" style="color:var(--accent-green); display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> CHÍNH XÁC! (+100 XP)`;
      feedbackTitle.style.color = "var(--accent-green)";
      feedbackExplanation.textContent = this.currentQuiz.explanation;
      
      // Trigger global state update
      if (window.appManager) {
        window.appManager.checkPracticeState("quiz", index);
      }
    } else {
      selectedEl.classList.add("wrong");
      correctEl.classList.add("correct"); // Highlight correct answer
      
      feedbackBox.style.display = "block";
      feedbackBox.style.backgroundColor = "rgba(239, 68, 68, 0.1)";
      feedbackBox.style.borderLeft = "4px solid var(--accent-red)";
      
      feedbackTitle.innerHTML = `<i data-lucide="alert-circle" style="color:var(--accent-red); display:inline-block; vertical-align:middle; margin-right:5px; width:18px; height:18px;"></i> CHƯA CHÍNH XÁC!`;
      feedbackTitle.style.color = "var(--accent-red)";
      feedbackExplanation.textContent = this.currentQuiz.explanation;
    }
    
    if (window.lucide) window.lucide.createIcons();
  }

  escapeHTML(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }
}
