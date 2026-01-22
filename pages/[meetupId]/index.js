import MeetupDetail from "../../components/meetups/MeetupDetail"

export default function MeetupDetailsPage(props) {
    return <MeetupDetail
        image={props.meetupData.image}
        title={props.meetupData.title}
        address={props.meetupData.address}
        description={props.meetupData.description}
    />
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;

    return {
        props: {
            meetupData: {   

                id: meetupId,
                image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/800px-Stadtbild_M%C3%BCnchen.jpg',
                title: 'A First Meetup',    
                address: 'Some address 5, 12345 Some City',
                description: 'This is a first meetup!'
            }
        }
    }
}   

export async function getStaticPaths() {
    return {
        paths: [
            { params: { meetupId: 'm1' } },
            { params: { meetupId: 'm2' } }
        ],
        fallback: false
    }
}