import MeetupDetail from "../../components/meetups/MeetupDetail"
import { MongoClient, ObjectId } from "mongodb";
import Head from "next/head";
import { Fragment } from "react/jsx-runtime";

export default function MeetupDetailsPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetail
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </Fragment>
    )
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const selectedMeetup = await meetupsCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();

    return {
        props: {
            meetupData: {   

                id: selectedMeetup._id.toString(),
                image: selectedMeetup.image,
                title: selectedMeetup.title,    
                address: selectedMeetup.address,
                description: selectedMeetup.description
            }
        }
    }
}   

export async function getStaticPaths() {

    const client = await MongoClient.connect('mongodb://localhost:27017/meetups');
    const db = client.db();
    const meetupsCollection = db.collection('meetups');
    const meetups = await meetupsCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        paths: meetups.map(meetup => ({ params: { meetupId: meetup._id.toString() } })),
        fallback: false
    }
}