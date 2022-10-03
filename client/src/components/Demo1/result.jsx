const Result = ({ result }) => {
    if (result != null) {
        return(
            <div>
                <p>
                    Last donor: {result.donor}
                </p>
                <p>
                    Amount: {result.amount} {result.token}
                </p>
                <p>
                    Donation date: {result.date}
                </p>
            </div>
        )
    }

}

export default Result;