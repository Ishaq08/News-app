const API_URL =
  'https://newsapi.org/v2/everything?q=tesla&from=2025-07-25&sortBy=publishedAt&apiKey=be36b26aae6c415b8c7abd40660689fa';

async function fetchNews() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    displayNews(data.articles || []);
  } catch (error) {
    console.error('Error fetching news:', error);
    document.getElementById('news-container').innerHTML =
      '<p>Failed to load news.</p>';
  }
}

function displayNews(articles) {
  const container = document.getElementById('news-container');
  container.innerHTML = '';

  if (!articles.length) {
    container.innerHTML = '<p>No news articles found.</p>';
    return;
  }

  articles.forEach((article) => {
    const newsCard = document.createElement('article');

    newsCard.innerHTML = `
      <img src="${
        article.urlToImage || 'https://via.placeholder.com/400x200'
      }" alt="News Image">
      <h2>${article.title || 'No Title'}</h2>
      <p>${article.description || ''}</p>
      <div class="meta">
        ${new Date(article.publishedAt).toLocaleString()} - ${
      article.source?.name || 'Unknown'
    }
      </div>
      <a href="${article.url}" target="_blank" class="read-more">Read More</a>
    `;

    container.appendChild(newsCard);
  });
}

// Fetch news on page load
fetchNews();
