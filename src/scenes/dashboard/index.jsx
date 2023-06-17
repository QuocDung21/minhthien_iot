import {
  Box,
  Button,
  ButtonBase,
  Switch,
  Typography,
  useTheme,
} from "@mui/material";
import { tokens } from "../../theme";
import * as React from "react";
import FormControlLabel from "@mui/material/FormControlLabel";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import { baseUrl } from "../../Api/baseUrl";
import DeviceThermostatIcon from "@mui/icons-material/DeviceThermostat";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useState } from "react";
import useFetch from "../../Api";
import axios from "axios";

const Dashboard = () => {
  const theme = useTheme();
  const [check, setCheck] = useState(false);
  const colors = tokens(theme.palette.mode);
  const label = { inputProps: { "aria-label": "Color switch demo" } };
  const apiValues = {
    data: "data.json",
    dosang: "dosang.json",
    motor: "motor.json",
    mua: "mua.json",
    nhietdo: "nhietdo.json",
  };
  // const { data, isLoading, error } = useFetch(`${baseUrl}${apiValues.data}`);
  const [data, setData] = useState([""]);
  const getData = async () => {
    axios
      .get(`${baseUrl}${apiValues.data}`)
      .then((result) => {
        setData(result.data);
      })
      .catch((err) => {});
  };

  const [state, setState] = React.useState({
    gilad: true,
    jason: false,
    antoine: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  React.useEffect(() => {
    setCheck(data?.motor);
    getData();
    setState({
      antoine: data?.motor,
    });

    const intervalId = setInterval(() => {
      getData();
      console.log("1");
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Vườn thông minh" subtitle="" />
        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            Reset
          </Button>
        </Box>
      </Box>
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.doam}
            subtitle="Độ ẩm"
            // progress="0.25"
            // increase="+14%"
            icon={
              <WaterDropIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.nhietdo}
            subtitle="Nhiệt độ"
            // progress="0.50"
            // increase="+21%"
            icon={
              <DeviceThermostatIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.dosang}
            subtitle="Độ sáng"
            // progress="0.30"
            // increase="+5%"
            icon={
              <WbSunnyIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={data?.mua == true ? "Đang mưa" : "Không có mưa"}
            subtitle="Mưa"
            // progress="0.80"
            // increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Bảng điều khiển
            </Typography>
          </Box>

          <Box
            key=""
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            p="25px"
          >
            <Box>
              <Typography
                color={colors.greenAccent[500]}
                variant="h3"
                fontWeight="600"
              >
                Motor {data?.motor === true ? "đang bật" : "đang tắt"}
              </Typography>
              <Typography color={colors.grey[100]}></Typography>
            </Box>
            <Box color={colors.grey[100]}>
              <img
                style={{ width: "50px" }}
                className=""
                src="https://cdn-icons-png.flaticon.com/512/2479/2479569.png"
                alt=""
              />
            </Box>
            <Box>
              <Button
                fontSize={20}
                color="secondary"
                onClick={(e) => {
                  e.preventDefault();
                  if (data?.motor === true) {
                    axios
                      .patch(
                        `https://test1-94303-default-rtdb.asia-southeast1.firebasedatabase.app/data.json`,
                        {
                          motor: false,
                        }
                      )
                      .then((result) => {
                        alert("Đã tắt");
                        getData();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else {
                    axios
                      .patch(
                        `https://test1-94303-default-rtdb.asia-southeast1.firebasedatabase.app/data.json`,
                        {
                          motor: true,
                        }
                      )
                      .then((result) => {
                        alert("Đã bật");
                        getData();
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
              >
                {data?.motor === true ? "Bật" : "Tắt"}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
