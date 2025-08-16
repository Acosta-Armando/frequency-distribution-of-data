// Import the Main component from the components folder
import Main from '@/components/Main'

// Define the Home component, which is the main page of the application
export default function Home() {
  return (
    // Render the main HTML element with a specific CSS class for styling
    <main className='min-height-responsive'>
      {/* Render the Main component */}
      <Main />
    </main>
  )
}
