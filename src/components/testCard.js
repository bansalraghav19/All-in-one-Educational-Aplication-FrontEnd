import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextInfoContent from '@mui-treasury/components/content/textInfo';
import { useBlogTextInfoContentStyles } from '@mui-treasury/styles/textInfoContent/blog';
import { useOverShadowStyles } from '@mui-treasury/styles/shadow/over';

const useStyles = makeStyles(({ breakpoints, spacing }) => ({
      troot: {
            margin: 'auto',
            borderRadius: spacing(2), // 16px
            transition: '0.3s',
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            position: 'relative',
            width: "100%",
            height:"100%",
            overflow: 'initial',
            background: '#ffffff',
            alignItems: 'center',
            paddingBottom: spacing(2),
            [breakpoints.up('md')]: {
                  flexDirection: 'row',
                  paddingTop: spacing(2),
            },
      },
      tmedia: {
            width: '20%',
            marginTop: spacing(-3),
            height: 0,
            paddingBottom: '48%',
            borderRadius: spacing(2),
            backgroundColor: '#fff',
            position: 'relative',
            [breakpoints.up('md')]: {
                  width: '80%',
                  marginLeft: spacing(-3),
                  marginTop: 0,
                  transform: 'translateX(-8px)',
            },
            '&:after': {
                  content: '" "',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '5%',
                  height: '100%',
                  borderRadius: spacing(2), // 16
                  opacity: 0.5,
            },
      },
      tcontent: {
            padding: 14,
      },
      cta: {
            marginTop: 24,
            textTransform: 'initial',
      },
}));


function BlogCardDemo(props){
      
      const styles = useStyles();

      const { button: buttonStyles, ...contentStyles } = useBlogTextInfoContentStyles();

      const shadowStyles = useOverShadowStyles();

      return (
      <Card className={cx(styles.troot, shadowStyles.root)}>
            <CardMedia
                  className={styles.tmedia}
                  image={"./assets/"+props.sub+".jpg"}
            />
            <CardContent className={styles.tcontent}>
                  <TextInfoContent
                        classes={contentStyles}
                        heading={props.sub}
                        body={props.content}
                  />
                  <Button button onClick={()=>props.handlesubmit(props.sub)} className={buttonStyles}>Submit</Button>
            </CardContent>
      </Card>
      );
}

export default BlogCardDemo