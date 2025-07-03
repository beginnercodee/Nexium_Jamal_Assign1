function Welcome(props) {
    return (
        <div style={{margin: '20px', padding: '10px', border: '1px solid #ccc'}}>
            <h2>Welcome, {props.name}!</h2>
            <p>This is a message for you: {props.message}</p>
        </div>
    );
}

export default Welcome;