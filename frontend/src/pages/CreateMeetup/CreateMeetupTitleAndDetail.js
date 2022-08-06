import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeMeetupTitleAndDetailForm } from '../../redux/actions/actions'
import { addImageAsync, removeImageAsync } from '../../redux/meetups/thunks'

export default function MeetupTitleAndDetail() {
    const dispatch = useDispatch()
    const titleAndDetailInfo = useSelector(state => state.createMeetupTitleDetailReducer);

    const [image, setImage] = useState("");
    const [fileType, setFileType] = useState("");
    let imageURL = useSelector(state => state.meetupsReducer.imageURL);

    useEffect(() => {
        console.log("use effect")
        dispatch(addImageAsync({image, fileType}))
    }, [dispatch, image, fileType])

    function handleFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        console.log(files)
        if (!files.length) return
        // setFileURL(files[0]);
        createImage(files[0])
    }

    function createImage (file) {

    const MAX_IMAGE_SIZE = 10000000
      // var image = new Image()
      let reader = new FileReader()
      reader.onload = (e) => {
        console.log('length: ', e.target.result.includes('data:image/jpeg') + e.target.result.includes('data:image/png'))
        if (e.target.result.includes('data:image/jpeg')) {
            setFileType("jpg");
        } else if (e.target.result.includes('data:image/png')) {
            setFileType("png");
        } else {
            return alert('Wrong file type - JPG or PNG only.')
        }
        if (e.target.result.length > MAX_IMAGE_SIZE) {
            return alert('Image is loo large.')
        }
        setImage(e.target.result);
        console.log(typeof image);
      }
      reader.readAsDataURL(file)
    }

    function handleRemoveImage() {
        console.log("Remove Image");
        setImage("");
        console.log(image);
        dispatch(removeImageAsync(imageURL));
    }
      
    let onChangeHandler = e => {
        dispatch(changeMeetupTitleAndDetailForm(e.target.value, e.target.name))
    }


    return (
        <>
            <Typography variant="h6" gutterBottom>
                Title
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Maximum 50 characters.
            </Typography>
            <Grid xs={12} sm={6} sx={{ mb: "3%" }} item={true}>
                <TextField
                    required
                    id="meetup-title"
                    name="meetup-title"
                    label="Meetup Title"
                    fullWidth
                    variant="standard"
                    defaultValue={titleAndDetailInfo["meetup-title"]}
                    onChange={onChangeHandler}
                    inputProps={{ maxLength: 50 }}
                />
            </Grid>


            {/* Description Input */}
            <Typography variant="h6" gutterBottom>
                Description
            </Typography>
            <Typography variant="subtitle2" gutterBottom>
                Maximum 1000 characters.
            </Typography>
            <Grid xs={12} sm={6} item={true}>
                <TextField
                    placeholder="Describe your meetup"
                    id="meetup-description"
                    name="meetup-description"
                    multiline
                    fullWidth
                    rows={12}
                    defaultValue={titleAndDetailInfo["meetup-description"]}
                    onChange={onChangeHandler}
                    inputProps={{ maxLength: 1000 }}
                />
            </Grid>

            <Grid xs={12} sm={6} item={true}>
                <img src={imageURL} style={{ maxWidth: "100%" }} />
            </Grid>
            <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
            >
                <ButtonGroup>
                    <div display="flex" flexDirection="row">
                    <Button
                        variant="outlined"
                        component="label"
                    >
                        Upload Image
                        <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                        />
                    </Button>
                    <Button
                      variant="outlined"
                      component="label"
                      disabled={imageURL === "" || imageURL === undefined}
                    >
                        Remove Image
                        <input
                          hidden
                          onClick={handleRemoveImage}
                        />
                    </Button>
                </div>
                </ButtonGroup>
                
            </Grid>
        </ >
    );
}