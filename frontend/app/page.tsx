"use client"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useState } from 'react';


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
    bookId: string
    setAppState: any
}

interface BookDetailsProps {
    bookText: string,
    setAppState: any,
    plotSummaryToggle: boolean
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

function BookDetails({bookText, setAppState, plotSummaryToggle}: BookDetailsProps){
    return bookText === "" ?
        (
            <LoadingSpinner/>
        )
        : (
        <div className="flex flex-col gap-10 overflow-hidden">
            <div className="flex justify-end">
                <Toggle>
                    <h1 className="text-1xl font-extrabold tracking-tight lg:text-1xl">
                        click here for plot summary
                    </h1>
                </Toggle>
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
            <TableRow>
              <TableCell>1787</TableCell>
              <TableCell>Hamlet</TableCell>
              <TableCell>Shakespare</TableCell>
              <TableCell>1989</TableCell>
            </TableRow>
          </TableBody>
        </Table>
    )
}

function Search({ bookId, setAppState }: SearchProps){
    const onSearch = () => {
        console.log("searching for book with id: ", bookId)
        setAppState(prevState => ({ ...prevState, dataTypeToDisplay: DataTypeToDisplay.BOOK_TEXT }))
        // make api call to get book text
        setTimeout(() => {
            setAppState(prevState => ({ ...prevState, bookText: "book text" }))
        }, 2000)
    }
    return (
        <div className="flex flex-col justify-center gap-4 row-start-2 items-center sm:items-start px-20">
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                Search book from project gutenberg
            </h3>
            <Input placeholder="Enter book ID" value={bookId} onChange={(event) => setAppState(prevState => ({ ...prevState, bookId: event.target.value }))}/>
            <Button className="w-full" onClick={onSearch}>Search</Button>
            <Button className="w-full" variant="outline">Recent activity</Button>
        </div>
    );
}


export default function Home() {
    const [appState, setAppState] = useState<appStateType>({
        dataTypeToDisplay: DataTypeToDisplay.ABOUT_GUTENBERG,
        bookId: "",
        bookText: "",
        plotSummary: "",
        recentActivity: "",
        plotSummaryToggle: false
    })

    return (
        <div className="flex min-h-screen">
            <div className="flex items-center justify-center h-screen w-2/5 bg-white p-6 shadow-lg">
                <Search bookId={appState.bookId} setAppState={setAppState}/>
            </div>
            <div className="flex flex-col h-screen w-3/5 bg-white p-20 shadow-lg">
                {appState.dataTypeToDisplay === DataTypeToDisplay.ABOUT_GUTENBERG && <AboutGutenberg/>}
                {appState.dataTypeToDisplay === DataTypeToDisplay.BOOK_TEXT && <BookDetails bookText={appState.plotSummaryToggle ? appState.plotSummary : appState.bookText} setAppState={setAppState}/>}
                {appState.dataTypeToDisplay === DataTypeToDisplay.RECENT_ACTIVITY && <RecentActivity/>}
            </div>
        </div>
    );
}
