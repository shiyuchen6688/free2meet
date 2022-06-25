import * as React from 'react';
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Typography from '@mui/material/Typography';


function TimeLineItem(props) {
    let item = props.item

    return (
        <TimelineItem>
            <TimelineOppositeContent
                sx={{ m: 'auto 0' }}
                align="right"
                variant="body2"
                color="text.secondary"
            >
                {item.time}
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineConnector />
                <TimelineDot color={item.isOver ? "grey" : "primary"}>
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent sx={{ py: '20px', px: 2 }}>
                <Typography variant="h6" component="span">
                    {item.title}
                </Typography>
                {/* <Typography>Mode description</Typography> */}
            </TimelineContent>
        </TimelineItem>
    )




}


export default function TimeLine(props) {
    // console.log(props)


    return (
        <>
            <Timeline position="alternate">
                {props.itemList.map(
                    (i) => <TimeLineItem item={i} key={i.title} />
                )
                }
            </Timeline>





        </>
    )
}