import { Box, Paper, Card, CardMedia } from "@mui/material";
import Image from "next/image";

export default function ExchangePolicy() {
  return (
    <Box sx={{ 
      display: "flex", 
      justifyContent: "center",
      maxWidth: '100%',
      overflow: 'hidden'
    }}>
      <Card 
        elevation={0} 
        sx={{ 
          maxWidth: '100%', 
          backgroundColor: 'transparent',
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Box sx={{ 
          position: 'relative',
          width: '100%',
          height: 'auto',
          maxHeight: '800px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <Image
            src="https://file.hstatic.net/1000402464/file/doi_tra_hang.jpg"
            alt="Chính sách đổi trả hàng"
            width={890}
            height={1259}
            style={{
              maxWidth: '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
          />
        </Box>
      </Card>
    </Box>
  );
}