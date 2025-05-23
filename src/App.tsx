import React from "react";

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
		<li key={idx}>
			Fibonacci index {fibIndex[idx]} is {num}
		</li>
	));
}

interface ListProps {
	list: {
		objectId: number;
		title: string;
		url: string;
		author: string;
		num_comments: number;
		points: number;
	}[];
}

const List = ({ list }: ListProps) =>
	list.map((item) => (
		<div key={item.objectId}>
			<ul>
				<li>
					<a href={item.url}>{item.title}</a>
					<span> by {item.author}</span>
					<span> | {item.num_comments} comments</span>
					<span> | {item.points} points</span>
				</li>
			</ul>
		</div>
	));

interface SearchProps extends Partial<HTMLInputElement> {
	onSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search = ({ onSearch, value }: SearchProps) => (
	<>
		<label htmlFor="search">Search: </label>
		<input type="text" id="search" value={value} onChange={onSearch}></input>
	</>
);

const App = () => {

	const useStorageState = (key: string, initialState: string): [string, React.Dispatch<React.SetStateAction<string>>] => {
		const [value, setValue] = React.useState<string>(localStorage.getItem("search") || initialState);

		React.useEffect(() => {
			localStorage.setItem("value", key);
	}, [value, key]);

		return [value, setValue];

	}; 


	const [searchTerm, setSearchTerm] = useStorageState("search", "React");
	
	const titleList = [
		{
			objectId: 1,
			title: "React",
			url: "https://reactjs.org/",
			author: "Meta",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 2,
			title: "Angular",
			url: "https://angular.io/",
			author: "Google",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 3,
			title: "Vue",
			url: "https://vuejs.org/",
			author: "Evan You",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 4,
			title: "Svelte",
			url: "https://svelte.dev/",
			author: "Rich Harris",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 5,
			title: "Ember",
			url: "https://emberjs.com/",
			author: "Yehuda Katz",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 6,
			title: "Backbone",
			url: "https://backbonejs.org/",
			author: "Jeremy Ashkenas",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 7,
			title: "Preact",
			url: "https://preactjs.com/",
			author: "Jason Miller",
			num_comments: 0,
			points: 0,
		},
		{
			objectId: 8,
			title: "Inferno",
			url: "https://infernojs.org/",
			author: "Dominic Tarr",
			num_comments: 0,
			points: 0,
		},
	];

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const searchedStories = titleList.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h1>
				{welcome.greeting} {welcome.title}
			</h1>
			<Search onSearch={handleSearch} />
			<hr />

			<ul>{renderFibonacci()}</ul>
			<List list={searchedStories} />
		</div>
	);
};
export default App;
