const searchClient = algoliasearch(
    'JVG5HIVKQX',
    'fc53df8adc50bc127dcd0f4d9d988309' // search only API key, not admin API key
  );
  
  const search = instantsearch({
    indexName: 'index',
    searchClient,
    routing: true,
  });
  
  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: 10,
    })
  ]);
  
  search.addWidgets([
    instantsearch.widgets.searchBox({
      container: '#search-box',
      placeholder: 'Buscar productos de limpieza',
    })
  ]);
  
  search.addWidgets([
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        item: document.getElementById('hit-template').innerHTML,
        empty: `no encontramos resultados para <em>"{{query}}"</em>`,
      },
    })
  ]);

  search.addWidgets([
    instantsearch.widgets.refinementList({
      container: document.querySelector('#brand'),
      attribute: 'tipo',
      showMore: true,
      templates: {
        item: `
          <a href="{{url}}" style="{{#isRefined}}font-weight: bold{{/isRefined}}">
            <span>{{label}} ({{count}})</span>
          </a>
        `,
      },
    })
  ]);

  instantsearch.widgets.numericMenu({
    container: '#numeric-menu',
    attribute: 'precio',
    items: [
      { label: 'All' },
      { label: 'Less than 500$', end: 500 },
      { label: 'Between 500$ - 1000$', start: 500, end: 1000 },
      { label: 'More than 1000$', start: 1000 },
    ],
  });


  
  search.start();