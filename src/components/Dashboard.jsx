import { useDispatch, useSelector } from 'react-redux'
import { setQuery, submitQueryAsync } from '../features/query/querySlice'
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

const suggestions = [
  'Show sales by product last month',
  'Display monthly revenue trend',
  'Top performing products this quarter',
  'Customer acquisition by channel'
]

const Dashboard = () => {
  const dispatch = useDispatch()
  const {
    currentQuery,
    queryHistory,
    results,
    isLoading,
    error
  } = useSelector((state) => state.query)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentQuery.trim()) {
      dispatch(submitQueryAsync(currentQuery))
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-black-800">
        Gen AI Analytics Dashboard
      </h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full p-3 border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Show sales by product last month"
            value={currentQuery}
            onChange={(e) => dispatch(setQuery(e.target.value))}
          />

          <div className="flex flex-wrap gap-2 mb-4">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                type="button"
                className="px-4 py-2 text-sm bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                onClick={() => dispatch(setQuery(suggestion))}
              >
                {suggestion}
              </button>
            ))}
          </div>

          <button
            type="submit"
            disabled={isLoading || !currentQuery.trim()}
            className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${isLoading || !currentQuery.trim() ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : 'Get Insights'}
          </button>
        </form>
      </div>

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6" role="alert">
          <p>{error}</p>
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
              {results ? `Results for: "${results.query}"` : 'Data Visualization'}
            </h2>
            <div className="h-96 mt-4">
              {results ? (
                <Bar
                  data={results.data}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: 'top',
                      },
                      title: {
                        display: true,
                        text: results.data.datasets[0].label,
                      },
                    },
                  }}
                />
              ) : (
                <div className="h-full flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg">
                  <p className="text-gray-500">
                    {isLoading
                      ? 'Processing your query...'
                      : 'Submit a query to see results'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="md:w-80">
          <div className="bg-white rounded-lg shadow-md p-6 h-full">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">Query History</h2>
            {queryHistory.length > 0 ? (
              <div className="overflow-y-auto max-h-96">
                {queryHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 mb-2 cursor-pointer hover:bg-gray-50 rounded-md"
                    onClick={() => {
                      dispatch(setQuery(item.query))
                      if (window.innerWidth < 768) {
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }
                    }}
                  >
                    <p className="font-medium">{item.query}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(item.timestamp).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                Your query history will appear here
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard