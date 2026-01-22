import MeetupList from "../components/meetups/MeetupList"
import { MongoClient } from "mongodb";
import { Fragment } from "react/jsx-runtime";
import Head from "next/head";


export default function HomePage(props) {
   
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name="description" content="Browse a huge list of highly active React meetups!" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

export async function getStaticProps() {

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');

    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString()
            }))
        },
        revalidate: 1
    }
}