
import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { makeStyles, useTheme } from "@mui/styles";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { Grid, Typography, Paper, Input, Box, Button, TextField } from "@mui/material";
import RichEditor from "../../components/text-editor";
import TextInputField from "../../components/text-input-field";
import DatePicker from "../../components/date-time-picker/date";
import TimePicker from "../../components/date-time-picker/time";
import DropdownField from "../../components/dropdown-field";
import Bullet from '@mui/icons-material/FiberManualRecord';

const useStyles = makeStyles((theme) => ({
  root: {
    // padding: "1.6rem",
    fontSize: "1.6rem",
    margin: "1.4rem",
  },
  heading: {
    fontSize: "3.2rem",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: "2.6rem",
  },
  buttonStyle: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.text.white,
  }
}));

var count = 0;

const ExamCreation = () => {

  const classes = useStyles();
  const history = useHistory();
  const theme = useTheme();

  const [selected, setSelected] = useState("");
  const [addNew, setAddNew] = useState(false);
  const [optionArr, setOptionArr] = useState([]);      //  [{} , {}]


  const [val, setVal] = useState(null);


  const [correctOptionArr, setCorrectOptionArr] = useState([]);  // [0,2,4]  arr of index
  const [index, setIndex] = useState(null);

  const AddNewOption = () => {
    console.log("added");
    setOptionArr([...optionArr, { id: count++, data: val }]);
    setAddNew(!addNew);
    setVal('');
  }

  const AddCorrectOption = () => {
    var arr = [];
    arr.push(...index);
    console.log(arr);
    setCorrectOptionArr([...correctOptionArr, correctOptionArr]);
    // setAddNew(!addNew);
    setIndex('');
  }

  useEffect(() => {
    console.log("MODIFIED OPTION ARRAY = ", optionArr);
    console.log("MODIFIED ANSWER ARRAY = ", correctOptionArr);

  }, [optionArr, correctOptionArr]);


  const abc = () => {

  }

  const ButtonText = [
    {
      title: 'Upload CSV',
      onClickTrigger: abc(),
    },
    {
      title: 'Preview',
      onClickTrigger: abc(),
    },
    {
      title: 'Save',
      onClickTrigger: abc(),
    },
    {
      title: 'Discard',
      onClickTrigger: abc(),
    },
  ]

  const Options = ['MCQ - 1 correct option', 'MCQ - More than 1 correct option', '1 word answer', 'Numerical', 'Fill in the blanks', 'Match the following'];


  return (
    <div className={classes.root}>

      <Typography className={classes.heading}>
        Examination Edit/Creation
      </Typography>

      <Box style={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, justifyContent: 'flex-end', alignItems: 'center', alignContent: 'center', }}  >
        {ButtonText.map((item, key) => {
          return (
            <>
              <Box sx={{ marginRight: "2rem", paddingRight: "1rem", flexWrap: 'wrap' }} >
                <Button className={classes.buttonStyle} onClick={() => { }} > {item.title}  </Button>
              </Box>
            </>
          )
        })}
      </Box>


      {/* Section 1  */}
      <Grid container spacing={2} direction="row" justifyContent="space-between" alignItems="flex-start" style={{ marginTop: "1.6rem" }}  >
        <Grid item>
          {/*  type, handler, value,row, rowMax, multiline */}
          <TextInputField
            label="Exam Name"
            placeholder="exam name"
            name="Exam Name"
            required
            fullWidth={true}
          />
        </Grid>

        <Grid item>
          <TextInputField
            label="Full Marks"
            placeholder="full marks"
            name="Full Marks"
            required
            fullWidth={true}
          />
        </Grid>

        <Grid item>
          <TextInputField
            label="Full Marks"
            placeholder="full marks"
            name="Full Marks"
            required
            fullWidth={true}
          />
        </Grid>

        <Grid item>
          <DatePicker
            // dateTime={date2}
            label="Examination Date"
            required
          // setDateTime={setDate2}
          />
        </Grid>

        <Grid item>
          <TimePicker
            // dateTime={date2}
            label="Examination Date"
            required
          // setDateTime={setDate2}
          />
        </Grid>
      </Grid>


      {/* Section 2  */}
      <Grid container direction="row" style={{ marginTop: "1.6rem" }} >
        <Paper elevation={2} style={{ padding: "1.5rem" }}  >

          <Grid item xs={12} lg={4} md={6} >
            <div style={{ paddingBottom: "1.5rem" }}>
              <DropdownField
                label="Question Type"
                placeholder="question type"
                name="Question Type"
                required
                fullWidth={true}
                options={Options}
                value={selected}
                handler={e => setSelected(e.target.value)}
              />
            </div>

            {/* Editor  */}
            <RichEditor />

            {(selected === 'MCQ - 1 correct option' || selected === 'MCQ - More than 1 correct option') &&
              (
                <div style={{ paddingLeft: "1.6rem", marginLeft: "1.5rem", marginBottom: "6rem" }} >

                  {/*  ------------------------------------      Options available     ----------------------------------- */}
                  <Typography variant='h6' style={{ paddingTop: "2rem", }} >  Available Options  :   </Typography>

                  <Typography variant='h6' style={{ paddingTop: ".6rem", fontWeight: "600", color: theme.palette.primary.main }} onClick={() => setAddNew(!addNew)} >
                    <AddCircleIcon style={{ paddingTop: "4px", marginTop: "4px" }} />   Add Option
                  </Typography>

                  {
                    !addNew && (
                      <Box style={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}  >
                        <Box sx={{ marginRight: "2rem", paddingBottom: "1.6rem" }} >
                          <TextField
                            id="standard-basic"
                            placeholder="type..."
                            label="New Option"
                            variant="standard"
                            name="newOption"
                            value={val}
                            onChange={e => setVal(e.target.value)}
                            classes={{}}
                          />
                        </Box>

                        <Box>
                          <Button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.white }} onClick={() => AddNewOption()}  > + ADD </Button>
                        </Box>
                      </Box>
                    )
                  }

                  {optionArr && optionArr.length != 0 && optionArr.map((item, index) => {
                    return (<>
                      <div>
                        {index + 1}) {item.data}
                      </div>
                    </>);
                  })}



                  {/*  ------------------------------------              Correct Options            ----------------------------------- */}
                  <Typography variant='h6' style={{ paddingTop: "2rem", }} > Correct Options  :   </Typography>

                  <Box style={{ display: 'flex', flexDirection: 'row', p: 1, m: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', }}  >
                    <Box sx={{ marginRight: "2rem", paddingBottom: "1.6rem" }} >
                      <TextField
                        id="standard-basic"
                        placeholder="type..."
                        label="New Option"
                        variant="standard"
                        name="newOption"
                        type="number"
                        value={index}
                        onChange={e => setIndex(e.target.value)}
                        classes={{}}
                      />
                    </Box>

                    <Box>
                      <Button style={{ backgroundColor: theme.palette.primary.main, color: theme.palette.text.white }} onClick={() => AddCorrectOption()}  > + ADD </Button>
                    </Box>
                  </Box>


                  {correctOptionArr && correctOptionArr.length != 0 && correctOptionArr.map((item, index) => {
                    return (<>
                      {/* <div> */}
                      <Bullet style={{ width: "1rem", height: "1rem" }} />  {item}
                      {/* </div> */}
                    </>);
                  })}
                </div>
              )}
          </Grid>





        </Paper>

      </Grid>
    </div>
  );
};

export default ExamCreation;
