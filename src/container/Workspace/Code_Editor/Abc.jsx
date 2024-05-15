import React, { useState } from 'react';
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Abc = ({userCode}) => {
	const [question, setQuestion] = useState('');
	const [answer, setAnswer] = useState('');
	const [generatingAnswer, setGeneratingAnswer] = useState(false);
	const problemText = `Write a function that takes a string as input and returns a new string with the characters reversed. 
  For example, if the input is "hello", the output should be "olleh".`;

	async function generateAnswer(e) {
		setGeneratingAnswer(true);
		e.preventDefault();

		setAnswer('Gemini is thinking... \n It might take upto 10 seconds.');
		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
					}`,
				method: 'post',
				data: {
					contents: [{ parts: [{ text: question }] }],
				},
			});

			// Update answer with the actual review from the API response
			setAnswer(
				response['data']['candidates'][0]['content']['parts'][0]['text'],
			);
		} catch (error) {
			console.log(error);
			setAnswer('Sorry - Something went wrong. Please try again!');
		}

		setGeneratingAnswer(false);
	}

	async function guideCode() {
		setGeneratingAnswer(true);
		setAnswer('Generating guide... \n It might take upto 10 seconds.');

		try {
			const response = await axios({
				url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT
					}`,
				method: 'post',
				data: {
					contents: [
						{
							parts: [
								{
									// text: 'rewrite this code in the same language: ' + userCode
									text: 'Imagine you are a professor majoring in Information Technology. I will show you a code problem, you will review my code. This is the problem: ' +
									problemText + 'This is the code I wrote to solve the problem: \n' + userCode +
									"Review my code. Is this code the code used to solve the above problem? If yes then tell me what do I need to do to improve my code ? If my code isn't use for the problem above, tell me to rewrite the code on my own. Do not give me the code to solve the problem, only guide me or give me advises to code better.",
								},
							],
						},
					],
				},
			});

			const guide =
				response['data']['candidates'][0]['content']['parts'][0]['text'];
			setAnswer(guide);
		} catch (error) {
			console.log(error);
			setAnswer("Sorry - Couldn't generate guide at this time.");
		}

		setGeneratingAnswer(false);
	}

	return <section class="flex justify-center items-center bg-black p-3">
		<Drawer>
			<DrawerTrigger asChild size="sm">
				<Button asChild size="sm" className="">
					<a href="#">
						<span>Review your Code</span>
						<Sparkles className="ml-3 h-4 w-4" />
					</a>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mx-auto w-full max-w-sm">
					<DrawerHeader>
						<DrawerTitle>Review your Code</DrawerTitle>
						<DrawerDescription>
							<form onSubmit={generateAnswer} className='text-center max-h-[470px] overflow-auto'>
								<div className="overflow-auto max-w-[450px] text-left">
									<ReactMarkdown className="mx-auto">
										{answer}
									</ReactMarkdown>
								</div>
							</form>
						</DrawerDescription>
					</DrawerHeader>
					<DrawerFooter>
						<button
							type='button'
							onClick={guideCode}
							className='bg-gray-900 p-3 rounded-md hover:bg-gray-500 transition-all duration-300 text-white'
							disabled={generatingAnswer}
						>
							Review
						</button>
						<DrawerClose asChild>
							<Button variant="outline">Close</Button>
						</DrawerClose>
					</DrawerFooter>
				</div>
			</DrawerContent>
		</Drawer>
		{/* <h1 className='text-white'>fklasjdflkjalsfd</h1> */}
	</section>;
};

export default Abc;