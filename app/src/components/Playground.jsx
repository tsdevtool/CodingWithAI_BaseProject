// import {
//     Bird,
//     CornerDownLeft,
//     Mic,
//     Paperclip,
//     Rabbit,
//     Settings,
//     Share,
//     Turtle,
// } from "lucide-react"

// import { Badge } from "@/components/ui/badge"
// import { Button } from "@/components/ui/button"
// import {
//     Drawer,
//     DrawerContent,
//     DrawerDescription,
//     DrawerHeader,
//     DrawerTitle,
//     DrawerTrigger,
// } from "@/components/ui/drawer"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     SelectValue,
// } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import {
//     TooltipProvider,
//     Tooltip,
//     TooltipContent,
//     TooltipTrigger,
// } from "@/components/ui/tooltip"
// import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts"
// import { Card, CardContent } from "@/components/ui/card"
// import { ChartContainer } from "@/components/ui/chart"
// import React, { useState } from 'react';
// import axios from 'axios';

// const FileUploadAndDisplay = () => {
//     const [files, setFiles] = useState([]);
//     const [selectedFile, setSelectedFile] = useState(null);
//     const [question, setQuestion] = useState('');
//     const [answer, setAnswer] = useState('');
//     const [generatingAnswer, setGeneratingAnswer] = useState(false);
//     const [error, setError] = useState('');

//     // Disallowed file extensions
//     const disallowedExtensions = [
//         '.doc', '.docx', '.pdf', '.ppt', '.pptx',
//         '.mp3', '.wav', '.ogg', '.mp4', '.avi', '.mov', '.wmv'
//     ];

//     const isAllowedFile = (file) => {
//         const extension = '.' + file.name.split('.').pop().toLowerCase();
//         return !disallowedExtensions.includes(extension);
//     };

//     const readFileContent = (file) => {
//         return new Promise((resolve, reject) => {
//             const reader = new FileReader();
//             reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
//             reader.onerror = (error) => reject(error);
//             reader.readAsText(file);
//         });
//     };

//     const handleFileChange = async (event) => {
//         const uploadedFiles = Array.from(event.target.files);
//         setError('');

//         // Filter out disallowed file types
//         const allowedFiles = uploadedFiles.filter(isAllowedFile);

//         if (allowedFiles.length !== uploadedFiles.length) {
//             setError('Only Code files allowed!');
//         }

//         if (allowedFiles.length > 0) {
//             const fileContents = await Promise.all(allowedFiles.map(readFileContent));
//             setFiles(fileContents);
//             setSelectedFile(null);
//         }
//     };

//     const handleFileSelect = (file) => {
//         setSelectedFile(file);
//     };

//     const generateAnswer = async (e) => {
//         e.preventDefault();
//         setGeneratingAnswer(true);
//         setAnswer('Gemini is thinking... \nIt might take up to 10 seconds.');

//         try {
//             const response = await axios({
//                 url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
//                 method: 'post',
//                 data: {
//                     contents: [
//                         {
//                             parts: [
//                                 {
//                                     text: `Imagine you are an AI coding assistant named CodeHub. Analyze the following file contents and answer the question:\n\n${files.map(file => `${file.name}:\n${file.content}\n\n`).join('')}\nQuestion: ${question}`,
//                                 },
//                             ],
//                         },
//                     ],
//                 },
//             });

//             setAnswer(response.data.candidates[0].content.parts[0].text);
//         } catch (error) {
//             console.log(error);
//             setAnswer('Sorry - Something went wrong. Please try again!');
//         }

//         setGeneratingAnswer(false);
//     };

//     return (
// <div className="grid h-screen w-full pl-[56px]">
//     <div className="flex flex-col">
//         <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
//             <h1 className="text-xl font-semibold">Playground</h1>
//             <Drawer>
//                 <DrawerTrigger asChild>
//                     <Button variant="ghost" size="icon" className="md:hidden">
//                         <Settings className="size-4" />
//                         <span className="sr-only">Settings</span>
//                     </Button>
//                 </DrawerTrigger>
//                 <DrawerContent className="max-h-[80vh]">
//                     <DrawerHeader>
//                         <DrawerTitle>Configuration</DrawerTitle>
//                         <DrawerDescription>
//                             Configure the settings for the model and messages.
//                         </DrawerDescription>
//                     </DrawerHeader>
//                     <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
//                         <fieldset className="grid gap-6 rounded-lg border p-4">
//                             <legend className="-ml-1 px-1 text-sm font-medium">
//                                 Settings
//                             </legend>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="model">Model</Label>
//                                 <Select>
//                                     <SelectTrigger
//                                         id="model"
//                                         className="items-start [&_[data-description]]:hidden"
//                                     >
//                                         <SelectValue placeholder="Select a model" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="genesis">
//                                             <div className="flex items-start gap-3 text-muted-foreground">
//                                                 <Rabbit className="size-5" />
//                                                 <div className="grid gap-0.5">
//                                                     <p>
//                                                         Neural{" "}
//                                                         <span className="font-medium text-foreground">
//                                                             Genesis
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-xs" data-description>
//                                                         Our fastest model for general use cases.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </SelectItem>
//                                         <SelectItem value="explorer">
//                                             <div className="flex items-start gap-3 text-muted-foreground">
//                                                 <Bird className="size-5" />
//                                                 <div className="grid gap-0.5">
//                                                     <p>
//                                                         Neural{" "}
//                                                         <span className="font-medium text-foreground">
//                                                             Explorer
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-xs" data-description>
//                                                         Performance and speed for efficiency.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </SelectItem>
//                                         <SelectItem value="quantum">
//                                             <div className="flex items-start gap-3 text-muted-foreground">
//                                                 <Turtle className="size-5" />
//                                                 <div className="grid gap-0.5">
//                                                     <p>
//                                                         Neural{" "}
//                                                         <span className="font-medium text-foreground">
//                                                             Quantum
//                                                         </span>
//                                                     </p>
//                                                     <p className="text-xs" data-description>
//                                                         The most powerful model for complex
//                                                         computations.
//                                                     </p>
//                                                 </div>
//                                             </div>
//                                         </SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="file">Upload your files</Label>
//                                 <Input id="file" type="file" />
//                             </div>
//                         </fieldset>
//                         <fieldset className="grid gap-6 rounded-lg border p-4">
//                             <legend className="-ml-1 px-1 text-sm font-medium">
//                                 Messages
//                             </legend>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="role">Role</Label>
//                                 <Select defaultValue="system">
//                                     <SelectTrigger>
//                                         <SelectValue placeholder="Select a role" />
//                                     </SelectTrigger>
//                                     <SelectContent>
//                                         <SelectItem value="system">System</SelectItem>
//                                         <SelectItem value="user">User</SelectItem>
//                                         <SelectItem value="assistant">Assistant</SelectItem>
//                                     </SelectContent>
//                                 </Select>
//                             </div>
//                             <div className="grid gap-3">
//                                 <Label htmlFor="content">Content</Label>
//                                 <Textarea id="content" placeholder="You are a..." />
//                             </div>
//                         </fieldset>
//                     </form>
//                 </DrawerContent>
//             </Drawer>
//             <Button
//                 variant="outline"
//                 size="sm"
//                 className="ml-auto gap-1.5 text-sm"
//             >
//                 <Share className="size-3.5" />
//                 Share
//             </Button>
//         </header>
//         <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
//             <div
//                 className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
//             >
//                 <form className="grid w-full items-start gap-6">
//                     <fieldset className="grid gap-6 rounded-lg border p-4">
//                         <legend className="-ml-1 px-1 text-sm font-medium">
//                             Infomation
//                         </legend>
//                         <div className="grid gap-3">
//                             <Label htmlFor="model">Model</Label>
//                             <Select>
//                                 <SelectTrigger
//                                     id="model"
//                                     className="items-start [&_[data-description]]:hidden"
//                                 >
//                                     <SelectValue placeholder="Select a model" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     <SelectItem value="genesis">
//                                         <div className="flex items-start gap-3 text-muted-foreground">
//                                             <Rabbit className="size-5" />
//                                             <div className="grid gap-0.5">
//                                                 <p>
//                                                     Neural{" "}
//                                                     <span className="font-medium text-foreground">
//                                                         Genesis
//                                                     </span>
//                                                 </p>
//                                                 <p className="text-xs" data-description>
//                                                     Our fastest model for general use cases.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </SelectItem>
//                                     <SelectItem value="explorer">
//                                         <div className="flex items-start gap-3 text-muted-foreground">
//                                             <Bird className="size-5" />
//                                             <div className="grid gap-0.5">
//                                                 <p>
//                                                     Neural{" "}
//                                                     <span className="font-medium text-foreground">
//                                                         Explorer
//                                                     </span>
//                                                 </p>
//                                                 <p className="text-xs" data-description>
//                                                     Performance and speed for efficiency.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </SelectItem>
//                                     <SelectItem value="quantum">
//                                         <div className="flex items-start gap-3 text-muted-foreground">
//                                             <Turtle className="size-5" />
//                                             <div className="grid gap-0.5">
//                                                 <p>
//                                                     Neural{" "}
//                                                     <span className="font-medium text-foreground">
//                                                         Quantum
//                                                     </span>
//                                                 </p>
//                                                 <p className="text-xs" data-description>
//                                                     The most powerful model for complex computations.
//                                                 </p>
//                                             </div>
//                                         </div>
//                                     </SelectItem>
//                                 </SelectContent>
//                             </Select>
//                         </div>
//                         <div className="grid gap-3">
//                             <Label htmlFor="file">Upload your files</Label>
//                             <Input id="file"
//                                 type="file"
//                                 onChange={handleFileChange}
//                                 multiple />
//                         </div>
//                     </fieldset>
//                     <fieldset className="grid gap-6 rounded-lg border p-4">
//                         <legend className="-ml-1 px-1 text-sm font-medium">
//                             Result
//                         </legend>
//                         <div className="grid gap-3">
//                             <Label htmlFor="role">Files</Label>
//                             <Select value={selectedFile ? selectedFile.name : ''} onValueChange={handleFileSelect}>
//                                 <SelectTrigger>
//                                     <SelectValue placeholder="Select a file" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                     {files.map((file, index) => (
//                                         <SelectItem key={index} value={file.name}>
//                                             {file.name}
//                                         </SelectItem>
//                                     ))}
//                                 </SelectContent>
//                             </Select>
//                         </div>

//                         <div className="grid gap-3">
//                             <Label htmlFor="content">Overall Review</Label>
//                             <Card className="max-w">
//                                 <CardContent className="flex gap-4 p-4">
//                                     <div className="grid items-center gap-2">
//                                         <div className="grid flex-1 auto-rows-min gap-0.5">
//                                             <div className="text-sm text-muted-foreground">Correctness</div>
//                                             <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2662d9]">
//                                                 85/100
//                                                 <span className="text-sm font-normal text-muted-foreground">
//                                                     points
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="grid flex-1 auto-rows-min gap-0.5">
//                                             <div className="text-sm text-muted-foreground">Efficiency</div>
//                                             <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2eb88a]">
//                                                 73/100
//                                                 <span className="text-sm font-normal text-muted-foreground">
//                                                     points
//                                                 </span>
//                                             </div>
//                                         </div>
//                                         <div className="grid flex-1 auto-rows-min gap-0.5">
//                                             <div className="text-sm text-muted-foreground">Readability</div>
//                                             <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#e88c30]">
//                                                 68/100
//                                                 <span className="text-sm font-normal text-muted-foreground">
//                                                     points
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <ChartContainer
//                                         config={{
//                                             move: {
//                                                 label: "Move",
//                                                 color: "hsl(var(--chart-1))",
//                                             },
//                                             exercise: {
//                                                 label: "Exercise",
//                                                 color: "hsl(var(--chart-2))",
//                                             },
//                                             stand: {
//                                                 label: "Stand",
//                                                 color: "hsl(var(--chart-3))",
//                                             },
//                                         }}
//                                         className="mx-auto aspect-square w-full max-w-[80%]"
//                                     >
//                                         <RadialBarChart
//                                             margin={{
//                                                 left: -10,
//                                                 right: -10,
//                                                 top: -10,
//                                                 bottom: -10,
//                                             }}
//                                             data={[
//                                                 {
//                                                     activity: "stand",
//                                                     value: (8 / 12) * 100,
//                                                     fill: "var(--color-stand)",
//                                                 },
//                                                 {
//                                                     activity: "exercise",
//                                                     value: (46 / 60) * 100,
//                                                     fill: "var(--color-exercise)",
//                                                 },
//                                                 {
//                                                     activity: "move",
//                                                     value: (245 / 360) * 100,
//                                                     fill: "var(--color-move)",
//                                                 },
//                                             ]}
//                                             innerRadius="20%"
//                                             barSize={24}
//                                             startAngle={90}
//                                             endAngle={450}
//                                         >
//                                             <PolarAngleAxis
//                                                 type="number"
//                                                 domain={[0, 100]}
//                                                 dataKey="value"
//                                                 tick={false}
//                                             />
//                                             <RadialBar dataKey="value" background cornerRadius={5} />
//                                         </RadialBarChart>
//                                     </ChartContainer>
//                                 </CardContent>
//                             </Card>
//                         </div>
//                     </fieldset>
//                 </form>
//             </div>
//                     <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
//                         <Badge variant="outline" className="absolute right-3 top-3">
//                             Output
//                         </Badge>
//                         <div className="flex-1" />
//                         <form
//                             className="relative overflow-hidden " x-chunk="dashboard-03-chunk-1"
//                         >
//                             <Label htmlFor="message" className="sr-only">
//                                 Message
//                             </Label>
//                             <Textarea
//                                 id="message"
//                                 placeholder="Type your message here..."
//                                 className="min-h-12 resize-none p-3 focus-visible:ring-0"
//                             />
//                             <div className="flex items-center pt-3">
//                                 <Button type="submit" size="sm" className="ml-auto gap-1.5">
//                                     Send Message
//                                     <CornerDownLeft className="size-3.5" />
//                                 </Button>
//                             </div>
//                         </form>
//                     </div>
//                 </main>
//             </div>
//         </div>
//     )
// }

// export default FileUploadAndDisplay;


import {
    Bird,
    CornerDownLeft,
    Mic,
    Paperclip,
    Rabbit,
    Settings,
    Share,
    Turtle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
    TooltipProvider,
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { PolarAngleAxis, RadialBar, RadialBarChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer } from "@/components/ui/chart";
import React, { useState } from 'react';
import axios from 'axios';

const FileUploadAndDisplay = () => {
    const [files, setFiles] = useState([]);
    const [selectedFile, setSelectedFile] = useState(null);
    const [question, setQuestion] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [generatingAnswer, setGeneratingAnswer] = useState(false);
    const [error, setError] = useState('');

    // Disallowed file extensions
    const disallowedExtensions = [
        '.doc', '.docx', '.pdf', '.ppt', '.pptx',
        '.mp3', '.wav', '.ogg', '.mp4', '.avi', '.mov', '.wmv'
    ];

    const isAllowedFile = (file) => {
        const extension = '.' + file.name.split('.').pop().toLowerCase();
        return !disallowedExtensions.includes(extension);
    };

    const readFileContent = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => resolve({ name: file.name, content: event.target.result });
            reader.onerror = (error) => reject(error);
            reader.readAsText(file);
        });
    };

    const handleFileChange = async (event) => {
        const uploadedFiles = Array.from(event.target.files);
        setError('');

        // Filter out disallowed file types
        const allowedFiles = uploadedFiles.filter(isAllowedFile);

        if (allowedFiles.length !== uploadedFiles.length) {
            setError('Only Code files allowed!');
        }

        if (allowedFiles.length > 0) {
            const fileContents = await Promise.all(allowedFiles.map(readFileContent));
            setFiles(fileContents);
            setSelectedFile(null);
        }
    };

    const handleFileSelect = (file) => {
        setSelectedFile(file);
    };

    const generateAnswer = async (e) => {
        e.preventDefault();
        setGeneratingAnswer(true);
        setChatHistory([...chatHistory, { type: 'question', text: question }]);

        try {
            const response = await axios({
                url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
                method: 'post',
                data: {
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Imagine you are an AI coding assistant named CodeHub. Analyze the following file contents and answer the question:\n\n${files.map(file => `${file.name}:\n${file.content}\n\n`).join('')}\nQuestion: ${question}`,
                                },
                            ],
                        },
                    ],
                },
            });

            setChatHistory([...chatHistory, { type: 'question', text: question }, { type: 'answer', text: response.data.candidates[0].content.parts[0].text }]);
        } catch (error) {
            console.log(error);
            setChatHistory([...chatHistory, { type: 'question', text: question }, { type: 'answer', text: 'Sorry - Something went wrong. Please try again!' }]);
        }

        setGeneratingAnswer(false);
        setQuestion('');
    };

    return (
        <div className="grid h-screen w-full pl-[56px]">
            <div className="flex flex-col">
                <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
                    <h1 className="text-xl font-semibold">Playground</h1>
                    <Drawer>
                        <DrawerTrigger asChild>
                            <Button variant="ghost" size="icon" className="md:hidden">
                                <Settings className="size-4" />
                                <span className="sr-only">Settings</span>
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent className="max-h-[80vh]">
                            <DrawerHeader>
                                <DrawerTitle>Configuration</DrawerTitle>
                                <DrawerDescription>
                                    Configure the settings for the model and messages.
                                </DrawerDescription>
                            </DrawerHeader>
                            <form className="grid w-full items-start gap-6 overflow-auto p-4 pt-0">
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Settings
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="model">Model</Label>
                                        <Select>
                                            <SelectTrigger
                                                id="model"
                                                className="items-start [&_[data-description]]:hidden"
                                            >
                                                <SelectValue placeholder="Select a model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="genesis">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Rabbit className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Genesis
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Our fastest model for general use cases.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="explorer">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Bird className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Explorer
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                Performance and speed for efficiency.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                                <SelectItem value="quantum">
                                                    <div className="flex items-start gap-3 text-muted-foreground">
                                                        <Turtle className="size-5" />
                                                        <div className="grid gap-0.5">
                                                            <p>
                                                                Neural{" "}
                                                                <span className="font-medium text-foreground">
                                                                    Quantum
                                                                </span>
                                                            </p>
                                                            <p className="text-xs" data-description>
                                                                The most powerful model for complex
                                                                computations.
                                                            </p>
                                                        </div>
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="file">Upload your files</Label>
                                        <Input id="file" type="file" />
                                    </div>
                                </fieldset>
                                <fieldset className="grid gap-6 rounded-lg border p-4">
                                    <legend className="-ml-1 px-1 text-sm font-medium">
                                        Messages
                                    </legend>
                                    <div className="grid gap-3">
                                        <Label htmlFor="role">Role</Label>
                                        <Select defaultValue="system">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="system">System</SelectItem>
                                                <SelectItem value="user">User</SelectItem>
                                                <SelectItem value="assistant">Assistant</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid gap-3">
                                        <Label htmlFor="content">Content</Label>
                                        <Textarea id="content" placeholder="You are a..." />
                                    </div>
                                </fieldset>
                            </form>
                        </DrawerContent>
                    </Drawer>
                    <Button
                        variant="outline"
                        size="sm"
                        className="ml-auto gap-1.5 text-sm"
                    >
                        <Share className="size-3.5" />
                        Share
                    </Button>
                </header>
                <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
                    <div
                        className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
                    >
                        <form className="grid w-full items-start gap-6">
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Infomation
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="model">Model</Label>
                                    <Select>
                                        <SelectTrigger
                                            id="model"
                                            className="items-start [&_[data-description]]:hidden"
                                        >
                                            <SelectValue placeholder="Select a model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="genesis">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Rabbit className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Genesis
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Our fastest model for general use cases.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="explorer">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Bird className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Explorer
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            Performance and speed for efficiency.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                            <SelectItem value="quantum">
                                                <div className="flex items-start gap-3 text-muted-foreground">
                                                    <Turtle className="size-5" />
                                                    <div className="grid gap-0.5">
                                                        <p>
                                                            Neural{" "}
                                                            <span className="font-medium text-foreground">
                                                                Quantum
                                                            </span>
                                                        </p>
                                                        <p className="text-xs" data-description>
                                                            The most powerful model for complex computations.
                                                        </p>
                                                    </div>
                                                </div>
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="file">Upload your files</Label>
                                    <Input id="file"
                                        type="file"
                                        onChange={handleFileChange}
                                        multiple />
                                </div>
                            </fieldset>
                            <fieldset className="grid gap-6 rounded-lg border p-4">
                                <legend className="-ml-1 px-1 text-sm font-medium">
                                    Result
                                </legend>
                                <div className="grid gap-3">
                                    <Label htmlFor="role">Files</Label>
                                    <Select value={selectedFile ? selectedFile.name : ''} onValueChange={handleFileSelect}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select a file" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {files.map((file, index) => (
                                                <SelectItem key={index} value={file.name}>
                                                    {file.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div className="grid gap-3">
                                    <Label htmlFor="content">Overall Review</Label>
                                    <Card className="max-w">
                                        <CardContent className="flex gap-4 p-4">
                                            <div className="grid items-center gap-2">
                                                <div className="grid flex-1 auto-rows-min gap-0.5">
                                                    <div className="text-sm text-muted-foreground">Correctness</div>
                                                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2662d9]">
                                                        85/100
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            points
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid flex-1 auto-rows-min gap-0.5">
                                                    <div className="text-sm text-muted-foreground">Efficiency</div>
                                                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#2eb88a]">
                                                        73/100
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            points
                                                        </span>
                                                    </div>
                                                </div>
                                                <div className="grid flex-1 auto-rows-min gap-0.5">
                                                    <div className="text-sm text-muted-foreground">Readability</div>
                                                    <div className="flex items-baseline gap-1 text-xl font-bold tabular-nums leading-none text-[#e88c30]">
                                                        68/100
                                                        <span className="text-sm font-normal text-muted-foreground">
                                                            points
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <ChartContainer
                                                config={{
                                                    move: {
                                                        label: "Move",
                                                        color: "hsl(var(--chart-1))",
                                                    },
                                                    exercise: {
                                                        label: "Exercise",
                                                        color: "hsl(var(--chart-2))",
                                                    },
                                                    stand: {
                                                        label: "Stand",
                                                        color: "hsl(var(--chart-3))",
                                                    },
                                                }}
                                                className="mx-auto aspect-square w-full max-w-[80%]"
                                            >
                                                <RadialBarChart
                                                    margin={{
                                                        left: -10,
                                                        right: -10,
                                                        top: -10,
                                                        bottom: -10,
                                                    }}
                                                    data={[
                                                        {
                                                            activity: "stand",
                                                            value: (8 / 12) * 100,
                                                            fill: "var(--color-stand)",
                                                        },
                                                        {
                                                            activity: "exercise",
                                                            value: (46 / 60) * 100,
                                                            fill: "var(--color-exercise)",
                                                        },
                                                        {
                                                            activity: "move",
                                                            value: (245 / 360) * 100,
                                                            fill: "var(--color-move)",
                                                        },
                                                    ]}
                                                    innerRadius="20%"
                                                    barSize={24}
                                                    startAngle={90}
                                                    endAngle={450}
                                                >
                                                    <PolarAngleAxis
                                                        type="number"
                                                        domain={[0, 100]}
                                                        dataKey="value"
                                                        tick={false}
                                                    />
                                                    <RadialBar dataKey="value" background cornerRadius={5} />
                                                </RadialBarChart>
                                            </ChartContainer>
                                        </CardContent>
                                    </Card>
                                </div>
                            </fieldset>
                        </form>
                    </div>
                    <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl border mt-2 p-4 lg:col-span-2">
                        <Badge variant="outline" className="absolute right-3 top-3">
                            Output
                        </Badge>
                        <div className="flex-1 overflow-auto p-4 mt-4 mb-4 max-h-[32rem]">
                            {chatHistory.map((chat, index) => (
                                <div
                                    key={index}
                                    className={`mb-4 rounded-lg p-2 ${chat.type === 'question' ? 'bg-blue-100 text-right' : 'bg-gray-100'
                                        }`}
                                >
                                    {chat.text}
                                </div>
                            ))}
                        </div>
                        <form onSubmit={generateAnswer} className="relative overflow-hidden">
                            <Label htmlFor="message" className="sr-only">
                                Message
                            </Label>
                            <Textarea
                                id="message"
                                placeholder="Type your message here..."
                                value={question}
                                onChange={(e) => setQuestion(e.target.value)}
                                className="min-h-12 resize-none p-3 focus-visible:ring-0"
                            />
                            <div className="flex items-center pt-3">
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Paperclip className="size-4" />
                                                <span className="sr-only">Attach file</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Attach File</TooltipContent>
                                    </Tooltip>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="ghost" size="icon">
                                                <Mic className="size-4" />
                                                <span className="sr-only">Use Microphone</span>
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent side="top">Use Microphone</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <Button type="submit" size="sm" className="ml-auto gap-1.5" disabled={generatingAnswer}>
                                    {generatingAnswer ? 'Generating...' : 'Send Message'}
                                    <CornerDownLeft className="size-3.5" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default FileUploadAndDisplay;