/* eslint-disable @next/next/no-img-element */
'use client';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
export default function ContentBanner() {
    return (
        <Box sx={{
            p: 2,
            marginTop: "40px",
            margin: "0 auto",
            width: "80%",
        }}>
            <Box component="section" sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <Box>
                    <Box>
                        <img src="https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg" alt="" />
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <img src="https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg" alt="" />
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <img src="https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg" alt="" />
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <img src="https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg" alt="" />
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <img src="https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg" alt="" />
                    </Box>
                </Box>
                <Box>
                    <Box>
                        <img src="https://file.hstatic.net/1000402464/file/icon2_d8c87caf494c45279fdf88fe4a539bb3.jpg" alt="" />
                    </Box>
                </Box>
            </Box>
            <Divider orientation="vertical" variant="middle" flexItem />
        </Box>
    );
}