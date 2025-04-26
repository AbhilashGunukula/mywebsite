// LeetCode API integration for portfolio website

document.addEventListener("DOMContentLoaded", function () {
  // Get username from data attribute
  const container = document.querySelector(".leetcode-container");
  const username = container.getAttribute("data-username") || "abhi354";

  // Initialize LeetCode integration
  const leetCode = new LeetCodeIntegration(username);
});

class LeetCodeIntegration {
  constructor(username) {
    this.username = username;
    this.apiUrl = `https://leetcode-stats-api.herokuapp.com/${username}`;
    this.container = document.querySelector(".leetcode-container");
    this.initialize();
  }

  async initialize() {
    try {
      this.showLoading();
      const data = await this.fetchData();
      this.renderStats(data);
    } catch (error) {
      this.showError(error);
    }
  }

  showLoading() {
    this.container.innerHTML = `
      <div class="leetcode-loading" data-aos="fade-up">
        <div class="spinner"></div>
        <p>Loading LeetCode stats...</p>
      </div>
    `;
  }

  showError(error) {
    this.container.innerHTML = `
      <div class="leetcode-error" data-aos="fade-up">
        <p>Error loading LeetCode stats: ${error.message}</p>
      </div>
    `;
  }

  async fetchData() {
    const response = await fetch(this.apiUrl);
    if (!response.ok) {
      throw new Error("Failed to fetch LeetCode data");
    }
    return await response.json();
  }

  renderStats(data) {
    const statsHtml = `
      <div class="leetcode-stats" data-aos="fade-up">
        <div class="stat-card">
          <div class="stat-icon">
            <i class="bi bi-fire"></i>
          </div>
          <div class="stat-content">
            <h3>${data.totalSolved}</h3>
            <p>Problems Solved</p>
          </div>
        </div>
        
        <div class="stat-card" data-aos="fade-up" data-aos-delay="100">
          <div class="stat-icon">
            <i class="bi bi-trophy"></i>
          </div>
          <div class="stat-content">
            <h3>${data.ranking}</h3>
            <p>Ranking</p>
          </div>
        </div>
        
        <div class="stat-card" data-aos="fade-up" data-aos-delay="200">
          <div class="stat-icon">
            <i class="bi bi-graph-up"></i>
          </div>
          <div class="stat-content">
            <h3>${data.acceptanceRate}%</h3>
            <p>Acceptance Rate</p>
          </div>
        </div>
      </div>
      
      <div class="leetcode-categories" data-aos="fade-up" data-aos-delay="300">
        <div class="category-card">
          <div class="category-header">
            <h3>Easy</h3>
            <span class="category-count">${data.easySolved}/${
      data.totalEasy
    }</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (data.easySolved / data.totalEasy) * 100
            }%"></div>
          </div>
        </div>
        
        <div class="category-card">
          <div class="category-header">
            <h3>Medium</h3>
            <span class="category-count">${data.mediumSolved}/${
      data.totalMedium
    }</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (data.mediumSolved / data.totalMedium) * 100
            }%"></div>
          </div>
        </div>
        
        <div class="category-card">
          <div class="category-header">
            <h3>Hard</h3>
            <span class="category-count">${data.hardSolved}/${
      data.totalHard
    }</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              (data.hardSolved / data.totalHard) * 100
            }%"></div>
          </div>
        </div>
      </div>
      
      <div class="leetcode-footer" data-aos="fade-up" data-aos-delay="400">
        <a href="https://leetcode.com/${
          this.username
        }/" target="_blank" class="btn btn-outline">
          <i class="bi bi-box-arrow-up-right"></i>
          View Full Profile
        </a>
      </div>
    `;

    this.container.innerHTML = statsHtml;
  }
}
