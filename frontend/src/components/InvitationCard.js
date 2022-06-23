import * as React from 'react';
import { Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardHeader from '@mui/material/CardHeader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { styled } from '@mui/material/styles';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Collapse from '@mui/material/Collapse';
import Place from './Place';
import ScheduleSelector from 'react-schedule-selector/dist/lib/ScheduleSelector';

const fakeCreator = {
    name: 'John Doe',
    profilePictureLink: 'https://www.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png',
};

const fakeMeetup = {
    title: 'Party 1',
    description: 'a description of party 1...',
    schedule: [],
    location: '',
    attendees: []
};

const fakeLocation = {
    "address_components":[
       {
          "long_name":"Vancouver",
          "short_name":"Vancouver",
          "types":[
             "locality",
             "political"
          ]
       },
       {
          "long_name":"UBC",
          "short_name":"UBC",
          "types":[
             "neighborhood",
             "political"
          ]
       },
       {
          "long_name":"Greater Vancouver A",
          "short_name":"Greater Vancouver A",
          "types":[
             "administrative_area_level_3",
             "political"
          ]
       },
       {
          "long_name":"Metro Vancouver",
          "short_name":"Metro Vancouver",
          "types":[
             "administrative_area_level_2",
             "political"
          ]
       },
       {
          "long_name":"British Columbia",
          "short_name":"BC",
          "types":[
             "administrative_area_level_1",
             "political"
          ]
       },
       {
          "long_name":"Canada",
          "short_name":"CA",
          "types":[
             "country",
             "political"
          ]
       },
       {
          "long_name":"V6T 1Z4",
          "short_name":"V6T 1Z4",
          "types":[
             "postal_code"
          ]
       }
    ],
    "adr_address":"<span class=\"locality\">Vancouver</span>, <span class=\"region\">BC</span> <span class=\"postal-code\">V6T 1Z4</span>, <span class=\"country-name\">Canada</span>",
    "formatted_address":"Vancouver, BC V6T 1Z4, Canada",
    "geometry":{
       "location":{
          "lat":49.26060520000001,
          "lng":-123.2459939
       }
    },
    "icon":"https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/school-71.png",
    "name":"The University of British Columbia",
    "place_id":"ChIJAx7UL8xyhlQR86Iqc-fUncc",
    "types":[
       "university",
       "point_of_interest",
       "establishment"
    ],
    "url":"https://maps.google.com/?cid=14383886875425940211",
    "html_attributions":[
       
    ],
    "lat":49.26060520000001,
    "lng":-123.2459939
};

const fakeTimezone = {
    "value": "America/Dawson",
    "label": "(GMT-7:00) Dawson, Yukon",
    "offset": -7
};

const fakeSchedule = {
    "schedule": [
        "2022-06-22T16:00:00.000Z",
        "2022-06-22T17:00:00.000Z",
        "2022-06-22T18:00:00.000Z",
        "2022-06-22T19:00:00.000Z",
        "2022-06-22T20:00:00.000Z",
        "2022-06-22T21:00:00.000Z",
        "2022-06-22T22:00:00.000Z",
        "2022-06-22T23:00:00.000Z",
        "2022-06-23T00:00:00.000Z",
        "2022-06-23T15:00:00.000Z",
        "2022-06-23T16:00:00.000Z",
        "2022-06-23T17:00:00.000Z",
        "2022-06-23T18:00:00.000Z",
        "2022-06-23T19:00:00.000Z",
        "2022-06-23T20:00:00.000Z",
        "2022-06-23T21:00:00.000Z",
        "2022-06-23T22:00:00.000Z",
        "2022-06-23T23:00:00.000Z",
        "2022-06-24T00:00:00.000Z",
        "2022-06-24T15:00:00.000Z",
        "2022-06-24T16:00:00.000Z",
        "2022-06-24T17:00:00.000Z",
        "2022-06-24T18:00:00.000Z",
        "2022-06-26T15:00:00.000Z",
        "2022-06-26T16:00:00.000Z",
        "2022-06-26T17:00:00.000Z",
        "2022-06-26T18:00:00.000Z",
        "2022-06-26T19:00:00.000Z",
        "2022-06-26T20:00:00.000Z",
        "2022-06-26T21:00:00.000Z",
        "2022-06-26T22:00:00.000Z",
        "2022-06-26T23:00:00.000Z",
        "2022-06-27T00:00:00.000Z",
        "2022-06-27T15:00:00.000Z",
        "2022-06-27T16:00:00.000Z",
        "2022-06-27T17:00:00.000Z",
        "2022-06-27T18:00:00.000Z",
        "2022-06-27T19:00:00.000Z",
        "2022-06-27T20:00:00.000Z",
        "2022-06-27T21:00:00.000Z",
        "2022-06-27T22:00:00.000Z",
        "2022-06-27T23:00:00.000Z",
        "2022-06-28T00:00:00.000Z",
        "2022-06-28T15:00:00.000Z",
        "2022-06-28T16:00:00.000Z",
        "2022-06-28T17:00:00.000Z",
        "2022-06-28T18:00:00.000Z",
        "2022-06-28T19:00:00.000Z",
        "2022-06-28T20:00:00.000Z",
        "2022-06-28T21:00:00.000Z",
        "2022-06-28T22:00:00.000Z",
        "2022-06-28T23:00:00.000Z",
        "2022-06-29T00:00:00.000Z"
    ],
    "timezone": "America/Vancouver",
    "startDate": "2022-06-23T02:59:43.289Z",
    "selectionScheme": "linear",
    "numDaysInput": 7,
    "numDays": 7,
    "hourlyChunkInput": 1,
    "hourlyChunk": 1,
    "timeInterval": [
        8,
        18
    ]
};

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

export default function InvitationCard({creator, meetup ,attendees}) {
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
    };

    return (
    <Box sx={{minWidth: 275, margin: 5}}>
        <Card variant="outlined">
            <CardHeader
                avatar={
                    <Avatar 
                        alt={fakeCreator.name}
                        src={fakeCreator.profilePictureLink}
                    />
                }
                // title={fakeMeetup.title}
                title={fakeCreator.name}
            />
            <CardContent>
                <Typography variant="h6" gutterBottom>
                    Title: {fakeMeetup.title}
                </Typography>
                <Typography variant="h6" gutterBottom>
                    Details:
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {fakeMeetup.description}
                </Typography>
            </CardContent>
            <Collapse in={!expanded} timeout="auto" unmountOnExit>
            <CardActions disableSpacing>
                <IconButton aria-label="Accept">
                <CheckIcon />
                </IconButton>
                <IconButton aria-label="Decline">
                <CloseIcon />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="View More"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            </Collapse>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <Box sx={{minWidth: 600, margin: 5}}>
                <CardContent>
                <Typography variant="h6" gutterBottom>
                    Locations
                    {/* Location {locationInfo.length === 0 ? "NA" : ""} */}
                </Typography>
                {/* {locationInfo.map((item) => {
                    return (<Place key={item.place_id} item={item} />);
                })} */}
                <Place key={fakeLocation.place_id} item={fakeLocation} deleteButton={false} />
                <Typography variant="h6" gutterBottom>
                    Timezone: {fakeTimezone.value}
                </Typography>
                <ScheduleSelector
                    selection={fakeSchedule.schedule}
                    selectionScheme={fakeSchedule.selectionScheme}
                    startDate={fakeSchedule.startDate}
                    numDays={fakeSchedule.numDays}
                    minTime={fakeSchedule.timeInterval[0]}
                    maxTime={fakeSchedule.timeInterval[1]}
                    hourlyChunks={fakeSchedule.hourlyChunk}
                    timeFormat={"h:mma"}
                    // onChange={(newSchedule) => {
                    //     let newScheduleArray = newSchedule.map((slot) => {
                    //         return JSON.parse(JSON.stringify(slot));
                    //     });
                    //     dispatch(updateSchedule(newScheduleArray));
                    // }}
                />
                </CardContent>
                <CardActions disableSpacing>
                <IconButton aria-label="Accept">
                <CheckIcon />
                </IconButton>
                <IconButton aria-label="Decline">
                <CloseIcon />
                </IconButton>
                <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="View More"
                >
                <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            </Box>
            </Collapse>
        </Card>
    </Box>
    );
}
