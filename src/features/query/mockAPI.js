export const processQuery = (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const response = generateMockData(query)
        resolve(response)
      }, 1500)
    })
  }
  
  const generateMockData = (query) => {
    const queryLower = query.toLowerCase()
    
    if (queryLower.includes('sales') && queryLower.includes('product')) {
      return {
        type: 'bar',
        data: {
          labels: ['Product A', 'Product B', 'Product C', 'Product D'],
          datasets: [{
            label: 'Sales (units)',
            data: [450, 320, 600, 200],
            backgroundColor: 'rgba(54, 162, 235, 0.7)',
          }]
        },
        query: query
      }
    }
    
    if (queryLower.includes('revenue') && queryLower.includes('month')) {
      return {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
          datasets: [{
            label: 'Revenue ($)',
            data: [5000, 4500, 6000, 7000, 6500, 8000],
            borderColor: 'rgb(75, 192, 192)',
            fill: false,
          }]
        },
        query: query
      }
    }
  
    return {
      type: 'bar',
      data: {
        labels: ['Category 1', 'Category 2', 'Category 3'],
        datasets: [{
          label: 'Values',
          data: [100, 200, 300],
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
        }]
      },
      query: query
    }
  }