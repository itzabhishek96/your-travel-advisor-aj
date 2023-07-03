// import axios from 'axios';

// export const getPlacesData = async (type, sw, ne) => {
//   try {
//     const { data: { data } } = await axios.get(`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`, {
//       params: {
//         bl_latitude: sw.lat,
//         bl_longitude: sw.lng,
//         tr_longitude: ne.lng,
//         tr_latitude: ne.lat,
//       },
//       headers: {
//         'x-rapidapi-key': '7b6aa5103amsh5f890e84f330cf1p1b31afjsn6f8e86a620b1',
//         'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
//       },
//     });

//     return data;
//   } catch (error) {
//     console.log(error);
//   }
// };

/* eslint-disable consistent-return */
import axios from "axios";

export const getPlacesData = async (type, sw, ne) => {
	try {
		const {
			data: { data },
		} = await axios.get(
			`https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`,
			{
				params: {
					bl_latitude: sw.lat,
					bl_longitude: sw.lng,
					tr_longitude: ne.lng,
					tr_latitude: ne.lat,
				},
				headers: {
					"x-Rapidapi-Key":
						process.env.REACT_APP_RAPID_API_TRAVEL_API_KEY,
					"x-Rapidapi-Host":
						"travel-advisor.p.rapidapi.com",
				},
			}
		);

		return data;
	} catch (error) {
		console.log(error);
	}
};