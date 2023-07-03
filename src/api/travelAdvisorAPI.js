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
