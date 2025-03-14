'use client';
import Box from '@mui/material/Box';
import Grid2 from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Image from "next/image";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export default function ProductItem() {
    return (
        <Grid2 container spacing={2} >
            <Grid2 item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: "0 !important", "&:hover": { boxShadow: "0 1px 6px 0 rgba(0,0,0,.2)" } }}>
                    <Image
                        src="https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
                        alt=""
                        width={500}
                        height={200}
                        style={{ width: "100%", height: "auto" }} />
                    <Box sx={{ p: 1 }}>
                        <Typography variant='subtitle1'>Áo Sơ Mi Tay Ngắn Form Ôm</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box>
                                <Typography variant='body1' sx={{ color: "#951329", fontWeight: 600 }}>700,000₫</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: 1 }}>
                                <Tooltip title="Favorite" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Add Cart" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
                                    </Button>
                                </Tooltip>

                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Grid2>
            <Grid2 item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: "0 !important", "&:hover": { boxShadow: "0 1px 6px 0 rgba(0,0,0,.2)" } }}>
                    <Image
                        src="https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
                        alt=""
                        width={500}
                        height={200}
                        style={{ width: "100%", height: "auto" }} />
                    <Box sx={{ p: 1 }}>
                        <Typography variant='subtitle1'>Áo Sơ Mi Tay Ngắn Form Ôm</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box>
                                <Typography variant='body1' sx={{ color: "#951329", fontWeight: 600 }}>700,000₫</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: 1 }}>
                                <Tooltip title="Favorite" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Add Cart" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
                                    </Button>
                                </Tooltip>

                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Grid2>
            <Grid2 item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: "0 !important", "&:hover": { boxShadow: "0 1px 6px 0 rgba(0,0,0,.2)" } }}>
                    <Image
                        src="https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
                        alt=""
                        width={500}
                        height={200}
                        style={{ width: "100%", height: "auto" }} />
                    <Box sx={{ p: 1 }}>
                        <Typography variant='subtitle1'>Áo Sơ Mi Tay Ngắn Form Ôm</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box>
                                <Typography variant='body1' sx={{ color: "#951329", fontWeight: 600 }}>700,000₫</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: 1 }}>
                                <Tooltip title="Favorite" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Add Cart" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
                                    </Button>
                                </Tooltip>

                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Grid2>
            <Grid2 item xs={6} sm={6} md={3} lg={3}>
                <Box sx={{ p: "0 !important", "&:hover": { boxShadow: "0 1px 6px 0 rgba(0,0,0,.2)" } }}>
                    <Image
                        src="https://product.hstatic.net/1000402464/product/ws25ss05t-sdbb_green_ck__2__b9fc1541947c4762b6c29129fa4f0635_large.jpg"
                        alt=""
                        width={500}
                        height={200}
                        style={{ width: "100%", height: "auto" }} />
                    <Box sx={{ p: 1 }}>
                        <Typography variant='subtitle1'>Áo Sơ Mi Tay Ngắn Form Ôm</Typography>
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                            <Box>
                                <Typography variant='body1' sx={{ color: "#951329", fontWeight: 600 }}>700,000₫</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "end", gap: 1 }}>
                                <Tooltip title="Favorite" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <FavoriteBorderIcon fontSize="small"></FavoriteBorderIcon>
                                    </Button>
                                </Tooltip>

                                <Tooltip title="Add Cart" placement="bottom">
                                    <Button sx={{ width: "fit-content", p: 0, minWidth: 0, "--variant-textColor": "black" }}>
                                        <AddShoppingCartIcon fontSize="small"></AddShoppingCartIcon>
                                    </Button>
                                </Tooltip>

                            </Box>

                        </Box>
                    </Box>
                </Box>

            </Grid2>

        </Grid2>
    );
}