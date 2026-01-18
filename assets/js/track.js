function habitTracker() {
  return {
    // Theme controller properties (for navbar component)
    ...themeController(),
    basePath: "..",
    activePage: "track",
    showExportButton: true,

    // Habit tracker data
    habits: [],
    completions: {},
    currentDate: new Date().toISOString().split("T")[0],

    // Form state
    habitForm: { name: "", description: "", frequency: "Daily" },
    editingHabit: null,
    habitToDelete: null,

    // Tips
    tips: [
      "Start small! It's better to do a habit for 5 minutes daily than 1 hour occasionally.",
      "Stack new habits onto existing ones for better consistency.",
      "Track your streaks - they're powerful motivators!",
      "Don't break the chain! Consistency is key to building habits.",
      "Celebrate small wins to stay motivated.",
      "Review your progress weekly to stay on track.",
      "Set reminders to help you remember your habits.",
      "Be patient - it takes about 66 days to form a new habit.",
    ],
    currentTip: "",

    // Charts
    weeklyChart: null,
    completionChart: null,

    // Get computed RGB color from DaisyUI CSS variable
    getThemeColor(colorName) {
      // Create a temporary element to compute the actual color
      const temp = document.createElement("div");
      temp.style.position = "absolute";
      temp.style.visibility = "hidden";
      temp.style.pointerEvents = "none";
      temp.style.width = "1px";
      temp.style.height = "1px";

      // Map color names to DaisyUI classes
      const colorMap = {
        primary: "bg-primary",
        secondary: "bg-secondary",
        accent: "bg-accent",
        success: "bg-success",
        warning: "bg-warning",
        error: "bg-error",
        info: "bg-info",
        "base-100": "bg-base-100",
        "base-200": "bg-base-200",
        "base-300": "bg-base-300",
        "base-content": "text-base-content",
      };

      const className = colorMap[colorName] || colorMap["primary"];
      temp.className = className;
      document.body.appendChild(temp);

      // Force style computation
      const computedStyle = window.getComputedStyle(temp);
      let color;

      if (colorName === "base-content") {
        color = computedStyle.getPropertyValue("color");
      } else {
        color = computedStyle.getPropertyValue("background-color");
      }

      document.body.removeChild(temp);

      // Fallback colors if computed color is empty or transparent
      if (!color || color === "rgba(0, 0, 0, 0)" || color === "transparent") {
        const fallbacks = {
          primary: "#6419e6",
          secondary: "#d926a9",
          accent: "#1fb2a6",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
          info: "#3abff8",
          "base-100": "#ffffff",
          "base-200": "#f2f2f2",
          "base-300": "#e5e5e5",
          "base-content": "#1f2937",
        };
        return fallbacks[colorName] || "#6419e6";
      }

      return color;
    },

    init() {
      // Initialize theme (from themeController)
      this.initTheme();

      // Load habit data
      this.loadData();

      // Set random tip
      this.currentTip = this.tips[Math.floor(Math.random() * this.tips.length)];

      // Initialize charts after DOM is ready
      this.$nextTick(() => {
        setTimeout(() => {
          this.initCharts();
        }, 100);
      });

      // Watch for changes and update charts (deep watch for nested objects)
      this.$watch("habits", () => {
        this.$nextTick(() => this.updateCharts());
      });
      this.$watch(
        "completions",
        () => {
          this.$nextTick(() => this.updateCharts());
        },
        { deep: true }
      );

      // Watch for theme changes and reinitialize charts
      this.$watch("currentTheme", () => {
        this.$nextTick(() => {
          setTimeout(() => {
            this.reinitCharts();
          }, 50);
        });
      });
    },

    //load dari localStorage
    loadData() {
      const habits = localStorage.getItem("habitTrackerHabits");
      const completions = localStorage.getItem("habitTrackerCompletions");

      if (habits) this.habits = JSON.parse(habits);
      if (completions) this.completions = JSON.parse(completions);
    },

    //simpan ke localStorage
    saveData() {
      localStorage.setItem("habitTrackerHabits", JSON.stringify(this.habits));
      localStorage.setItem(
        "habitTrackerCompletions",
        JSON.stringify(this.completions)
      );
    },

    // Date helpers
    formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    },

    //ni nak pendekkan date je
    formatDateShort(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      });
    },

    //nak tentukan tarikh harini
    isToday() {
      return this.currentDate === new Date().toISOString().split("T")[0];
    },

    //nak navigate ke tarikh sebelum
    previousDay() {
      const date = new Date(this.currentDate);
      date.setDate(date.getDate() - 1);
      this.currentDate = date.toISOString().split("T")[0];
    },

    //nak navigate ke tarikh selepas
    nextDay() {
      if (!this.isToday()) {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + 1);
        this.currentDate = date.toISOString().split("T")[0];
      }
    },

    //nak drag balik ke current date
    goToToday() {
      this.currentDate = new Date().toISOString().split("T")[0];
    },

    // Habit CRUD
    openAddModal() {
      this.editingHabit = null;
      this.habitForm = { name: "", description: "", frequency: "Daily" };
      document.getElementById("habit-modal").showModal();
    },

    // Quick add habit from input bar
    quickAddHabit() {
      if (!this.habitForm.name.trim()) return;
      
      this.habits.push({
        id: Date.now(),
        name: this.habitForm.name.trim(),
        description: "",
        frequency: "Daily",
        createdAt: new Date().toISOString(),
      });
      
      this.habitForm.name = "";
      this.saveData();
    },

    openEditModal(habit) {
      this.editingHabit = habit;
      this.habitForm = { ...habit };
      document.getElementById("habit-modal").showModal();
    },

    closeModal() {
      document.getElementById("habit-modal").close();
    },

    saveHabit() {
      if (!this.habitForm.name.trim()) return;

      if (this.editingHabit) {
        // Update existing
        const index = this.habits.findIndex(
          (h) => h.id === this.editingHabit.id
        );
        if (index !== -1) {
          this.habits[index] = { ...this.habits[index], ...this.habitForm };
        }
      } else {
        // Add new
        this.habits.push({
          id: Date.now(),
          ...this.habitForm,
          createdAt: new Date().toISOString(),
        });
      }

      this.saveData();
      this.closeModal();
    },

    deleteHabit(id) {
      this.habitToDelete = id;
      document.getElementById("confirm-modal").showModal();
    },

    confirmDelete() {
      if (this.habitToDelete) {
        this.habits = this.habits.filter((h) => h.id !== this.habitToDelete);
        // Also remove completions for this habit
        Object.keys(this.completions).forEach((date) => {
          if (this.completions[date]) {
            this.completions[date] = this.completions[date].filter(
              (id) => id !== this.habitToDelete
            );
          }
        });
        this.saveData();
        this.habitToDelete = null;
      }
      document.getElementById("confirm-modal").close();
    },

    // Completion tracking
    isHabitCompleted(habitId) {
      return this.completions[this.currentDate]?.includes(habitId) || false;
    },

    toggleHabit(habitId) {
      if (!this.completions[this.currentDate]) {
        this.completions[this.currentDate] = [];
      }

      const index = this.completions[this.currentDate].indexOf(habitId);
      if (index === -1) {
        this.completions[this.currentDate].push(habitId);
      } else {
        this.completions[this.currentDate].splice(index, 1);
      }

      this.saveData();

      // Directly update chart data without recreating the chart
      const completed = this.getCompletedCount();
      const remaining = Math.max(0, this.habits.length - completed);

      if (this.completionChart && this.completionChart.data) {
        this.completionChart.data.datasets[0].data = [completed, remaining];
        this.completionChart.update();
      }

      if (this.weeklyChart && this.weeklyChart.data) {
        const data = [];
        for (let i = 6; i >= 0; i--) {
          const date = new Date();
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split("T")[0];
          data.push(this.completions[dateStr]?.length || 0);
        }
        this.weeklyChart.data.datasets[0].data = data;
        this.weeklyChart.update();
      }
    },

    getCompletedCount() {
      return this.completions[this.currentDate]?.length || 0;
    },

    getCompletionRate() {
      if (this.habits.length === 0) return 0;
      return Math.round((this.getCompletedCount() / this.habits.length) * 100);
    },

    // Streak calculation
    getHabitStreak(habitId) {
      let streak = 0;
      let date = new Date();

      // Check if completed today first
      const todayStr = date.toISOString().split("T")[0];
      if (!this.completions[todayStr]?.includes(habitId)) {
        // If not completed today, start from yesterday
        date.setDate(date.getDate() - 1);
      }

      while (true) {
        const dateStr = date.toISOString().split("T")[0];
        if (this.completions[dateStr]?.includes(habitId)) {
          streak++;
          date.setDate(date.getDate() - 1);
        } else {
          break;
        }
      }

      return streak;
    },

    getBestStreak() {
      let maxStreak = 0;
      this.habits.forEach((habit) => {
        const streak = this.getHabitStreak(habit.id);
        if (streak > maxStreak) maxStreak = streak;
      });
      return maxStreak;
    },

    // Charts
    initCharts() {
      this.initWeeklyChart();
      this.initCompletionChart();
    },

    reinitCharts() {
      // Destroy existing charts and recreate with new theme colors
      try {
        if (this.weeklyChart) {
          this.weeklyChart.destroy();
          this.weeklyChart = null;
        }
        if (this.completionChart) {
          this.completionChart.destroy();
          this.completionChart = null;
        }
      } catch (e) {
        console.error("Error destroying charts:", e);
      }

      // Wait a bit for DOM to update, then reinitialize
      setTimeout(() => {
        this.initCharts();
      }, 100);
    },

    initWeeklyChart() {
      const ctx = document.getElementById("weekly-chart");
      if (!ctx) return;

      const labels = [];
      const data = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split("T")[0];
        labels.push(date.toLocaleDateString("en-US", { weekday: "short" }));
        // Calculate percentage for this day
        const completedCount = this.completions[dateStr]?.length || 0;
        const percentage = this.habits.length > 0 ? Math.round((completedCount / this.habits.length) * 100) : 0;
        data.push(percentage);
      }

      // Get theme colors
      const primaryColor = this.getThemeColor("primary");
      const baseContentColor = this.getThemeColor("base-content");
      const baseColor = this.getThemeColor("base-300");

      this.weeklyChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "Completion %",
              data,
              backgroundColor: primaryColor,
              borderRadius: 6,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: function(context) {
                  return context.raw + '%';
                }
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              max: 100,
              ticks: {
                stepSize: 25,
                color: baseContentColor,
                callback: function(value) {
                  return value + '%';
                }
              },
              grid: {
                color: baseColor,
              },
            },
            x: {
              ticks: {
                color: baseContentColor,
              },
              grid: {
                display: false,
              },
            },
          },
        },
      });
    },

    initCompletionChart() {
      const ctx = document.getElementById("completion-chart");
      if (!ctx) return;

      const completed = this.getCompletedCount();
      const remaining = Math.max(0, this.habits.length - completed);

      // Get theme colors
      const successColor = this.getThemeColor("success");
      const baseColor = this.getThemeColor("base-300");
      const baseContentColor = this.getThemeColor("base-content");

      this.completionChart = new Chart(ctx, {
        type: "doughnut",
        data: {
          labels: ["Completed", "Remaining"],
          datasets: [
            {
              data: [completed, remaining],
              backgroundColor: [successColor, baseColor],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: baseContentColor,
              },
            },
          },
          cutout: "60%",
        },
      });
    },

    updateCharts() {
      // Update weekly chart
      if (this.weeklyChart && this.weeklyChart.data) {
        try {
          const data = [];
          for (let i = 6; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split("T")[0];
            // Calculate percentage for this day
            const completedCount = this.completions[dateStr]?.length || 0;
            const percentage = this.habits.length > 0 ? Math.round((completedCount / this.habits.length) * 100) : 0;
            data.push(percentage);
          }
          this.weeklyChart.data.datasets[0].data = data;
          this.weeklyChart.update("none"); // Update without animation for better performance
        } catch (e) {
          console.error("Error updating weekly chart:", e);
          this.initWeeklyChart();
        }
      } else {
        this.initWeeklyChart();
      }

      // Update completion chart
      if (this.completionChart && this.completionChart.data) {
        try {
          const completed = this.getCompletedCount();
          const remaining = Math.max(0, this.habits.length - completed);
          this.completionChart.data.datasets[0].data = [completed, remaining];
          this.completionChart.update("none"); // Update without animation for better performance
        } catch (e) {
          console.error("Error updating completion chart:", e);
          this.initCompletionChart();
        }
      } else {
        this.initCompletionChart();
      }
    },

    // Export functions
    printReport() {
      window.print();
    },

    downloadReport() {
      // Create a printable HTML content
      const reportContent = this.generateReportHTML();
      const printWindow = window.open("", "_blank");
      printWindow.document.write(reportContent);
      printWindow.document.close();
      printWindow.print();
    },

    generateReportHTML() {
      const completedHabits = this.habits.filter((h) =>
        this.isHabitCompleted(h.id)
      );
      const incompleteHabits = this.habits.filter(
        (h) => !this.isHabitCompleted(h.id)
      );

      //ni template print out report dalam bentuk html
      return `
          <!DOCTYPE html>
          <html>
          <head>
              <title>Daily Blueprint - Habit Report</title>
              <style>
                  body { font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto; }
                  h1 { color: #ff865b; border-bottom: 2px solid #ff865b; padding-bottom: 10px; }
                  h2 { color: #333; margin-top: 30px; }
                  .stat-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin: 20px 0; }
                  .stat-box { background: #f5f5f5; padding: 15px; border-radius: 8px; text-align: center; }
                  .stat-value { font-size: 24px; font-weight: bold; color: #ff865b; }
                  .stat-label { font-size: 12px; color: #666; }
                  .habit-list { list-style: none; padding: 0; }
                  .habit-item { padding: 10px; border-bottom: 1px solid #eee; display: flex; align-items: center; gap: 10px; }
                  .habit-complete { color: #22c55e; }
                  .habit-incomplete { color: #ef4444; }
                  .footer { margin-top: 40px; text-align: center; color: #666; font-size: 12px; }
              </style>
          </head>
          <body>
              <h1>Daily Blueprint - Habit Report</h1>
              <p><strong>Date:</strong> ${this.formatDate(
                this.currentDate
              )}</p>
              
              <div class="stat-grid">
                  <div class="stat-box">
                      <div class="stat-value">${
                        this.habits.length
                      }</div>
                      <div class="stat-label">Total Habits</div>
                  </div>
                  <div class="stat-box">
                      <div class="stat-value">${this.getCompletedCount()}</div>
                      <div class="stat-label">Completed</div>
                  </div>
                  <div class="stat-box">
                      <div class="stat-value">${this.getCompletionRate()}%</div>
                      <div class="stat-label">Completion Rate</div>
                  </div>
                  <div class="stat-box">
                      <div class="stat-value">${this.getBestStreak()}</div>
                      <div class="stat-label">Best Streak</div>
                  </div>
              </div>

              <h2>✅ Completed Habits (${
                completedHabits.length
              })</h2>
              <ul class="habit-list">
                  ${completedHabits
                    .map(
                      (h) => `
                      <li class="habit-item">
                          <span class="habit-complete">✓</span>
                          <span>${h.name}</span>
                          <span style="color: #666; font-size: 12px;">(${h.frequency})</span>
                      </li>
                  `
                    )
                    .join("")}
                  ${
                    completedHabits.length === 0
                      ? '<li class="habit-item" style="color: #666;">No habits completed yet</li>'
                      : ""
                  }
              </ul>

              <h2>⏳ Remaining Habits (${
                incompleteHabits.length
              })</h2>
              <ul class="habit-list">
                  ${incompleteHabits
                    .map(
                      (h) => `
                      <li class="habit-item">
                          <span class="habit-incomplete">○</span>
                          <span>${h.name}</span>
                          <span style="color: #666; font-size: 12px;">(${h.frequency})</span>
                      </li>
                  `
                    )
                    .join("")}
                  ${
                    incompleteHabits.length === 0
                      ? '<li class="habit-item" style="color: #22c55e;">Congrats! All habits completed.</li>'
                      : ""
                  }
              </ul>

              <div class="footer">
                  <p>Generated by Daily Blueprint | ${new Date().toLocaleString()}</p>
              </div>
          </body>
          </html>
      `;
    },
  };
}
