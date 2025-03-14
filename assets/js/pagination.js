document.addEventListener('DOMContentLoaded', function() {
    var currentFilter = '*';
    var searchQuery = '';
    var currentPage = 1;
    var itemsPerPage = 4; // 4 items per page
    var isoContainer = document.querySelector('.isotope-container');
  
    // Initialize Isotope with a combined filter for category and search
    var iso = new Isotope(isoContainer, {
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows',
      transitionDuration: '0.6s',
      filter: function(itemElem) {
        var isCategory = (currentFilter === '*' || itemElem.classList.contains(currentFilter.slice(1)));
        var isSearch = (searchQuery === '' || itemElem.textContent.toLowerCase().indexOf(searchQuery.toLowerCase()) > -1);
        return isCategory && isSearch;
      }
    });
  
    // Function to scroll to the portfolio section
    function scrollToPortfolio() {
      var portfolioSection = document.getElementById('portfolio');
      if (portfolioSection) {
        portfolioSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  
    // Update Pagination based on filtered items
    function updatePagination() {
      var filteredItems = iso.getFilteredItemElements();
      var totalPages = Math.ceil(filteredItems.length / itemsPerPage);
      var paginationContainer = document.querySelector('#pagination');
      paginationContainer.innerHTML = '';
  
      if (totalPages > 1) {
        for (var i = 1; i <= totalPages; i++) {
          var pageBtn = document.createElement('button');
          pageBtn.textContent = i;
          pageBtn.dataset.page = i;
          pageBtn.classList.add('btn', 'btn-sm', 'mx-1');
          pageBtn.classList.toggle('btn-primary', i === currentPage);
          pageBtn.classList.toggle('btn-outline-primary', i !== currentPage);
          paginationContainer.appendChild(pageBtn);
        }
      }
  
      filteredItems.forEach(function(item, index) {
        if (index >= (currentPage - 1) * itemsPerPage && index < currentPage * itemsPerPage) {
          item.style.display = '';
        } else {
          item.style.display = 'none';
        }
      });
      iso.layout();
    }
  
    function filterItems() {
      currentPage = 1; // Reset page on filter/search change
      iso.arrange();
      updatePagination();
      scrollToPortfolio(); // Scroll to portfolio section after filtering
    }
  
    document.querySelector('.portfolio-filters').addEventListener('click', function(event) {
      if (event.target.tagName.toLowerCase() === 'li') {
        currentFilter = event.target.getAttribute('data-filter');
        this.querySelector('.filter-active').classList.remove('filter-active');
        event.target.classList.add('filter-active');
        filterItems();
      }
    });
  
    document.querySelector('#portfolio-search').addEventListener('keyup', function(e) {
      searchQuery = e.target.value;
      filterItems();
    });
  
    document.querySelector('#pagination').addEventListener('click', function(e) {
      if (e.target.tagName === 'BUTTON') {
        currentPage = parseInt(e.target.dataset.page);
        updatePagination();
        scrollToPortfolio(); // Scroll when changing page
      }
    });
  
    // Initial update
    filterItems();
  });
  