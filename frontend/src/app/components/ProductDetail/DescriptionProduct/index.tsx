import { Box, Typography, Paper } from "@mui/material";

export default function DescriptionProduct({ description }: { description: string }) {
  return (
    <Box sx={{ color: 'text.primary' }}>
      <Typography variant="body1" component="div" sx={{ 
        lineHeight: 1.8,
        '& p': { mb: 2 },
        '& h1, & h2, & h3, & h4, & h5': { 
          mt: 3, 
          mb: 2,
          fontWeight: 500 
        },
        '& img': { 
          maxWidth: '100%', 
          height: 'auto',
          borderRadius: 1,
          my: 2
        },
        '& ul, & ol': {
          pl: 3,
          mb: 2,
          '& li': {
            mb: 1
          }
        }
      }}>
        {/* For HTML content, you can use dangerouslySetInnerHTML */}
        {/* If description is plain text: */}
        {description}
        
        {/* If description is HTML: 
        <div dangerouslySetInnerHTML={{ __html: description }} />
        */}
      </Typography>
    </Box>
  );
}