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
	onRemoveItem: (objectId: number) => void;
}
const List = ({ list, onRemoveItem }: ListProps) =>
	list.map((item) => (
		<div key={item.objectId}>
			<ul>
				<li>
					<a href={item.url}>{item.title}</a>
					<span> by {item.author}</span>
					<span> | {item.num_comments} comments</span>
					<span> | {item.points} points</span>
					<button onClick={() => onRemoveItem(item.objectId)}>Remove</button>
				</li>
			</ul>
		</div>
	));

const InputWithLabel = ({
	id,
	value,
	onInputChange,
	type = "text",
	children,
}: {
	id: string;
	value: string;
	onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	type?: string;
	children: React.ReactNode;
}) => (
	<>
		<label htmlFor={id}>{children}</label>
		<input
			id={id}
			type={type}
			value={value}
			onChange={onInputChange}
		/>
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

	const initialTitleList = [
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

	const [searchTerm, setSearchTerm] = useStorageState("search", "");
	const [stories, setStories] = React.useState(initialTitleList);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchTerm(event.target.value);
	};

	const handleRemovedStory = (objectId: number) => {
		const updatedList = stories.filter(
			(story) => story.objectId !== objectId
		);

		setStories(updatedList);
	};

	const searchedStories = stories.filter((story) =>
		story.title.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div>
			<h1>
				{welcome.greeting} {welcome.title}
			</h1>
			<InputWithLabel
				id="search"
				value={searchTerm}
				onInputChange={handleSearch}
				><strong>Search: </strong></InputWithLabel>
			<hr />

			<ul>{renderFibonacci()}</ul>
			<List list={searchedStories} onRemoveItem={handleRemovedStory} />
		</div>
	);
};
export default App;
