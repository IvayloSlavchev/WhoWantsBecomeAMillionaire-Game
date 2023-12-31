import '../Styles/ErrorPage.css';

const ErrorPage = () => {
    return (
        <div className='error-message'>
            <h1>Sorry, something went wrong or page does not exist!</h1>
            <h1 className='status-code'>404</h1>
        </div>
    )
}

export default ErrorPage