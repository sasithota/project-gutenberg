"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {useEffect, useState} from 'react';
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"


enum DataTypeToDisplay {
    ABOUT_GUTENBERG,
    BOOK_TEXT,
    RECENT_ACTIVITY,
}

type appStateType = {
    dataTypeToDisplay: DataTypeToDisplay,
    bookId: string,
    bookText: string,
    plotSummary: string,
    recentActivity: string,
    plotSummaryToggle: boolean
}

interface SearchProps {
    bookId: string,
    setBookId: any,
    setDataTypeToDisplay: any
}

interface BookDetailsProps {
    bookId: string
}

function AboutGutenberg(){
    return (
        <>
            <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
                About Project Gutenberg
            </h1>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
                Project Gutenberg is a pioneering digital library that provides free access to a vast collection of
                literary works, primarily those in the public domain. Founded in 1971 by Michael S. Hart, it was one
                of the first initiatives to digitize and distribute literary texts on a large scale. With over 60,000
                eBooks available in various formats, including plain text, ePub, and Kindle, Project Gutenberg aims to
                promote literacy and education by making classic literature accessible to everyone, regardless of
                location or economic status. The project thrives on community contributions, relying on volunteers for
                digitization and proofreading efforts, and has inspired similar initiatives globally. Through its
                user-friendly platform, Project Gutenberg continues to play a vital role in preserving cultural
                heritage and democratizing access to literature.
            </p>
        </>
    )
}

function LoadingSpinner(){
    return (
        <div className="flex justify-center items-center h-full">
            <div className="animate-spin h-12 w-12 rounded-full border-4 border-solid border-current border-r-transparent"></div>
        </div>
    )
}

function BookDetails({bookId}: BookDetailsProps){
    const [toggleText, setToggleText] = useState<boolean>(false);
    const [bookText, setBookText] = useState<string>("")
    useEffect(() => {
        // Make api call and fetch book text
        if(toggleText){
            // fetch plot summary
        } else {
            setTimeout(() => {
                setBookText("hello")
            }, 2000)
            // fetch book text
        }
    }, [toggleText])

    return bookText === "" ?
        (
            <LoadingSpinner/>
        )
        : (
        <div className="flex flex-col gap-10 overflow-hidden">
            <div className="flex justify-end">
                <div className="flex items-center space-x-3">
                    <Switch onClick={() => setToggleText(!toggleText)}/>
                    <Label className="w-32">{toggleText ? "Plot summary": "Book text"}</Label>
                </div>
            </div>
            <div className="max-h-full overflow-y-auto">
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {bookText}
                </p>
            </div>

        </div>
    )
}


function RecentActivity() {
    const [recentActivity, setRecentActivity] = useState([])
    useEffect(() => {
        // fetch recent activity

    }, [])
    return (
        <Table>
            <TableCaption>previously accessed books</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Book ID</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>date published</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
        {
          recentActivity.map((activity, index) => (
            <TableRow key={index}>
              <TableCell>{activity.bookId}</TableCell>
              <TableCell>{activity.title}</TableCell>
              <TableCell>{activity.author}</TableCell>
              <TableCell>{activity.datePublished}</TableCell>
            </TableRow>
          ))
        }
          </TableBody>
        </Table>
    )
}

function Search({ bookId, setBookId, setDataTypeToDisplay }: SearchProps){
    return (
        <div className="flex flex-col justify-center gap-4 row-start-2 items-center sm:items-start px-20">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Search book from project gutenberg
            </h3>
            <Input placeholder="Enter book ID" value={bookId} onChange={(event) => setBookId(event.target.value)}/>
            <Button className="w-full" onClick={() => {setDataTypeToDisplay(DataTypeToDisplay.BOOK_TEXT)}}>Search</Button>
            <Button className="w-full" variant="outline" onClick={() => {setDataTypeToDisplay(DataTypeToDisplay.RECENT_ACTIVITY)}}>Recent activity</Button>
        </div>
    );
}


export default function Home() {
    const [dataTypeToDisplay, setDataTypeToDisplay] = useState<DataTypeToDisplay>(DataTypeToDisplay.ABOUT_GUTENBERG)
    const [bookId, setBookId] = useState<string>("")

    return (
        <div className="flex min-h-screen">
            <div className="flex items-center justify-center h-screen w-2/5 bg-white p-6 shadow-lg">
                <Search bookId={bookId} setBookId={setBookId} setDataTypeToDisplay={setDataTypeToDisplay}/>
            </div>
            <div className="flex flex-col h-screen w-3/5 bg-white p-20 shadow-lg">
                {dataTypeToDisplay === DataTypeToDisplay.ABOUT_GUTENBERG && <AboutGutenberg/>}
                {dataTypeToDisplay === DataTypeToDisplay.BOOK_TEXT && <BookDetails bookId={bookId}/>}
                {dataTypeToDisplay === DataTypeToDisplay.RECENT_ACTIVITY && <RecentActivity/>}
            </div>
        </div>
    );
}
