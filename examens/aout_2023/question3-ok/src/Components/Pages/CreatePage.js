import { clearPage } from '../../utils/render';

const NewPage = () => {
  clearPage();
  renderGoBackHomeButton();
};

function renderGoBackHomeButton() {
  const main = document.querySelector('main');
  const html = `
    <div class="container">
    <h1>Create a query Page</h1>
    <form>
      <div class="mb-3">
        <label for="query" class="form-label">Query</label>
        <input type="text" class="form-control" id="query" aria-describedby="queryHelp">
        <div id="queryHelp" class="form-text">Enter your query here</div>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </div>
  `;
  main.innerHTML = html;

  const form = document.querySelector('form');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = document.querySelector('#query').value;

    await fetch('/api/queries', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          subject: query,
          status: 'requested'
      })

    });
    form.reset();
  });
}

export default NewPage;
