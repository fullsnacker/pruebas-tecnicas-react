import { useEffect, useState } from 'react';
import './app.css';

function App() {
	const [loading, setLoading] = useState(true);
	const [catFact, setCatFact] = useState();
	const [catImageUrl, setCatImageUrl] = useState();

	const GIPHY_API_KEY = import.meta.env.VITE_APP_GIPHY_API_KEY;

	const getCatFact = () => {
		fetch('https://catfact.ninja/fact')
			.then((res) => res.json())
			.then((data) => {
				setCatFact(data.fact);
			});
	};

	const getImage = () => {
		const firstWords = getFirstWords(catFact, 3);
		fetch(
			`https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${firstWords}&limit=1`
		)
			.then((res) => res.json())
			.then((data) => {
				setCatImageUrl(data.data[0].images.original.url);
				setLoading(false);
			});
	};

	const getFirstWords = (sentence, words) => {
		return sentence.split(' ').slice(0, words).join(' ');
	};

	useEffect(() => {
		getCatFact();
	}, []);

	useEffect(() => {
		if (catFact) getImage();
	}, [catFact]);

	return (
		<>
			{loading ? (
				<div className="alert alert-info text-center">Loading...</div>
			) : (
				<div className="cat-grid">
					<h3>{catFact}</h3>
					<img src={catImageUrl} alt="catImage" />
				</div>
			)}
		</>
	);
}

export default App;
