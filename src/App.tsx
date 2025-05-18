const welcome = {
	greeting: "Hey",
	title: "React",
};

const fibIndex = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const fibonacci = (n: number): number => {
	if (n <= 1) {
		return n;
	}
	return fibonacci(n - 1) + fibonacci(n - 2);
};

function renderFibonacci() {
	const fibNumbers = fibIndex.map((idx) => fibonacci(idx));
	return fibNumbers.map((num, idx) => (
		<div key={idx}>
			Fibonacci index {fibIndex[idx]} is {num}
		</div>
	));
}

function App() {
	return (
		<div>
			<h1>
				{renderFibonacci()}
				{welcome.greeting} {welcome.title}
			</h1>
			<label htmlFor="search">Search:</label>
			<input type="text" id="search" />
		</div>
	);
}

export default App;
