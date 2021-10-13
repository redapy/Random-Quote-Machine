import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const variants = {
    initial: {
        x: '400px',
        opacity:0
    },
    animate: {
        x:0,
        opacity: 1,
        transition: {type: 'tween', duration:1.5}
    }
}


const QuoteBox = () => {
    var colors = [
        '#16a085',
        '#27ae60',
        '#2c3e50',
        '#f39c12',
        '#e74c3c',
        '#9b59b6',
        '#FB6964',
        '#342224',
        '#472E32',
        '#BDBB99',
        '#77B1A9',
        '#73A857'
      ];

    const [quote, setQuote] = useState([]);
    const [color, setColor] = useState('#73A857');
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(false);

    const handleClick = () => {
        fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then( data =>
            setQuote(data[Math.floor(Math.random()*data.length)])
        )
        .catch(e => {
            setError(true)
            setIsPending(false)
        })

        setColor(colors[Math.floor(Math.random()*colors.length)])
    }

    useEffect(() => {
        fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then( data =>
            {
                setQuote(data[Math.floor(Math.random()*data.length)]);
                setIsPending(false)
            })
            .catch(e => {
                setError(true)
                setIsPending(false)
            })
    }, []);

    return ( 
        <div style={{backgroundColor: color}} className="wrapper">
            <motion.div 
                id="quote-box"
                variants={variants}
                initial="initial"
                animate="animate"
            >
                {error && <div>couldn't fetch the data</div>}
                {isPending && <div>Loading...</div>}
                <h1 style={{color: color}} id="text">{quote.text}</h1>
                <p id="author">-by {quote.author}</p>
                <div className="flex">
                    <a 
                        id="tweet-quote" 
                        type="button" 
                        role="button" 
                        title="Share on twitter"
                        href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fparse.com"
                        rel="noreferrer"
                        target="_blank">
                    <i class="fab fa-2x fa-twitter"> Tweet it</i>
                    </a>
                    <motion.button style={{backgroundColor: color}} id="new-quote" onClick={handleClick} 
                     whileHover={{ 
                        scale: 1.2, 
                        textShadow: "0px 0px 8px rgb(255,255,255)",
                        boxShadow: "0px 0px 8px rgb(255,255,255)",
                      }}
                      
                    >
                    New Quote
                    </motion.button>
                </div>
            </motion.div>
        </div>
     );
}
 
export default QuoteBox;