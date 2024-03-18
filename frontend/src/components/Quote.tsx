const Quote = () => {
    // List of quotes with additional information
    const quotesList = [
        {
            quote: "The function of leadership is to produce more leaders, not more followers.",
            name: "Ralph Nader",
            position: "Political activist, author, lecturer, and attorney",
        },
        {
            quote: "The only limit to our realization of tomorrow will be our doubts of today.",
            name: "Franklin D. Roosevelt",
            position: "32nd President of the United States",
        },
        {
            quote: "Your most unhappy customers are your greatest source of learning.",
            name: "Bill Gates",
            position: "Co-founder of Microsoft",
        },
        {
            quote: "I have not failed. I've just found 10,000 ways that won't work.",
            name: "Thomas A. Edison",
            position: "Inventor and Businessman",
        },
        {
            quote: "Success usually comes to those who are too busy to be looking for it.",
            name: "Henry David Thoreau",
            position: "Author and Philosopher",
        },
        {
            quote: "The best way to predict the future is to create it.",
            name: "Peter Drucker",
            position: "Management consultant, educator, and author",
        },
        {
            quote: "The way to get started is to quit talking and begin doing.",
            name: "Walt Disney",
            position: "Co-founder of The Walt Disney Company",
        },
        {
            quote: "It's fine to celebrate success, but it is more important to heed the lessons of failure.",
            name: "Bill Gates",
            position: "Co-founder of Microsoft",
        },
        {
            quote: "You can't use up creativity. The more you use, the more you have.",
            name: "Maya Angelou",
            position: "Author and Poet",
        },
    ];

    // Select a random quote from the list
    const randomIndex = Math.floor(Math.random() * quotesList.length);
    const { quote, name, position } = quotesList[randomIndex];

    return (
        <div className="bg-gradient-to-r from-cyan-100 to-cyan-500 h-screen flex justify-center items-center">
            <div>
                <div className="max-w-lg text-3xl font-bold">
                    <blockquote>"{quote}"</blockquote>
                </div>
                <div className="max-w-md text-xl font-semibold ">{name}</div>
                <div className="max-w-md text-sm font-medium text-slate-400">
                    {position}
                </div>
            </div>
        </div>
    );
};

export default Quote;
