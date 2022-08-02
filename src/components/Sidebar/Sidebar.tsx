import { SetStateAction, useEffect } from "react";
import {
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    ListSubheader,
} from "@mui/material";
import { useTheme } from "@mui/styles";
import { GenerImage, Image, ImageLink, Links } from "./styles";
import { useGetGenresQuery } from "../../services/TMDB";
import genreIcons from "../../assets/genres/index";
import { selectGenreOrCateogary } from "../../features/currentGenreOrCateograry";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { GenresType } from "../../types";
const redLogo =
    "https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png";
const blueLogo =
    "https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png";

type cateograiesType = {
    label: string;
    value: "popular" | "top_rated" | "upcoming" | number;
};

const cateograies: cateograiesType[] = [
    { label: "Popular", value: "popular" },
    { label: "Top Rated", value: "top_rated" },
    { label: "Upcoming", value: "upcoming" },
];

interface Props {
    setMobileOpen: React.Dispatch<SetStateAction<boolean>>;
}

const Sidebar = ({ setMobileOpen }: Props) => {
    const { genreIdOrCateogaryName } = useAppSelector(
        (state) => state.currentGenreOrCateogory
    );
    const { data, isFetching } = useGetGenresQuery();
    const theme = useTheme();
    const dispatch = useAppDispatch();
    return (
        <>
            <ImageLink to="/" className="imageLink">
                <Image
                    src={theme.palette.mode === "dark" ? redLogo : blueLogo}
                    alt="Filmpure logo"
                />
            </ImageLink>
            <Divider />
            <List>
                <ListSubheader>Cateograies</ListSubheader>
                {cateograies.map(({ label, value }: cateograiesType) => (
                    <Links key={value} to="/">
                        <ListItem
                            onClick={() =>
                                dispatch(selectGenreOrCateogary(value))
                            }
                            button
                        >
                            <ListItemIcon>
                                <GenerImage
                                    src={genreIcons[label.toLowerCase()]}
                                    height={30}
                                />
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    </Links>
                ))}
            </List>
            <Divider />
            <List>
                <ListSubheader>Genres</ListSubheader>
                {isFetching ? (
                    <Box display={"flex"} justifyContent="center">
                        <CircularProgress size={"4rem"} />
                    </Box>
                ) : (
                    data?.genres.map(({ name, id }: GenresType) => (
                        <Links key={id} to="/">
                            <ListItem
                                onClick={() =>
                                    dispatch(selectGenreOrCateogary(id))
                                }
                                button
                            >
                                <ListItemIcon>
                                    <GenerImage
                                        src={genreIcons[name.toLowerCase()]}
                                        height={30}
                                    />
                                </ListItemIcon>
                                <ListItemText primary={name} />
                            </ListItem>
                        </Links>
                    ))
                )}
            </List>
        </>
    );
};

export default Sidebar;
