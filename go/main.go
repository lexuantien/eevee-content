package main

import (
	"context"
	"encoding/json"
	"fmt"
	"hcvn/cloudflarebp"
	"io"
	"io/ioutil"
	"log"
	"strconv"
	"time"

	"net/http"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type General struct {
	ID       string `bson:"id"`
	ParentID string `bson:"parentID"`
	Name     string `bson:"name" json:"name"`
}

type Province struct {
	General `bson:",inline"`
	Code    string `json:"code"`
}

type District struct {
	General    `bson:",inline"`
	DistrictID int `json:"districtID"`
}

type Ward struct {
	General `bson:",inline"`
	WardID  int `bson:"wardID"`
}

type Street struct {
	General  `bson:",inline"`
	StreetID int `bson:"streetID"`
}

//
type DistrictBDS struct {
	DistrictId int    `json:"districtId"`
	Name       string `json:"name"`
	CityCode   string `json:"cityCode"`
}

type WardBDS struct {
	WardId     int    `json:"wardId"`
	Name       string `json:"name"`
	DistrictId int    `json:"districtId"`
}

func get(url string, headers map[string]string) (*http.Response, error) {

	req, err := http.NewRequest(http.MethodGet, url, nil)
	if err != nil {
		return nil, err
	}

	for key, value := range headers {
		req.Header.Set(key, value)
	}

	// apply our bypass for request headers and client TLS configurations
	client := http.DefaultClient
	http.DefaultClient.Transport = cloudflarebp.AddCloudFlareByPass(http.DefaultClient.Transport)

	res, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}

	return res, nil
}

func readJson[T any](reader io.Reader) (T, error) {

	body, readErr := ioutil.ReadAll(reader)
	if readErr != nil {
		log.Fatal(readErr)
	}

	var t T
	jsonErr := json.Unmarshal(body, &t)
	if jsonErr != nil {
		log.Fatal(jsonErr)
	}

	return t, nil
}

func getProvinceList() []Province {
	url := "https://batdongsan.com.vn/Product/ProductSearch/GetCities"

	// header := map[string]string{
	// 	"cookie":                      "con.ses.id=175bda88-9ef8-4de0-b151-f0951ddc6ce8; max-age=1800; path=/",
	// 	"referer":                     "https://batdongsan.com.vn/",
	// 	"sec-ch-ua":                   `" Not A;Brand";v="99", "Chromium";v="102", "Microsoft Edge";v="102"`,
	// 	"user-agent":                  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.5005.27 Safari/537.36 Edg/102.0.1245.7",
	// 	"x-requested-with":            "XMLHttpRequest",
	// 	"content-security-policy":     "upgrade-insecure-requests; frame-ancestors 'self' https://batdongsan.com.vn https://*.batdongsan.com.vn",
	// 	"accept":                      "*/*",
	// 	"accept-encoding":             "gzip, deflate, br",
	// 	"access-control-allow-origin": "*",
	// 	"accept-language":             "en-US,en;q=0.9",
	// 	"sec-fetch-site":              "same-origin",
	// 	"content-type":                "application/json; charset=utf-8",
	// 	"cf-ray":                      "729f2665485787d1-SIN",
	// 	"server":                      "cloudflare",
	// }

	res, err := get(url, map[string]string{})
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	provinceList, _ := readJson[[]Province](res.Body)

	return provinceList
}

func getDistrictList() []DistrictBDS {
	url := "https://batdongsan.com.vn/Product/ProductSearch/GetDistricts"

	res, err := get(url, map[string]string{})
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	districtList, _ := readJson[[]DistrictBDS](res.Body)

	return districtList
}

func getWardByDitrict(f, t int) []WardBDS {
	url := "https://batdongsan.com.vn/Product/ProductSearch/GetWardsByDistrictIds?"
	params := ""

	count := 0

	for i := f; i <= t; i++ {
		params += "districtIds[" + strconv.Itoa(count) + "]=" + strconv.Itoa(i)
		if i != t {
			params += "&"
		}
		count++
	}

	res, err := get(url+params, map[string]string{})
	if err != nil {
		log.Fatal(err)
	}
	defer res.Body.Close()

	wardList, _ := readJson[[]WardBDS](res.Body)

	return wardList
}

func insertEach[T any](client *mongo.Client, collection string, ctx context.Context, data []T) {
	coll := client.Database("test").Collection(collection)
	for _, subData := range data {
		create(coll, ctx, subData)
	}
}

func insertMany[T any](client *mongo.Client, collection string, ctx context.Context, data []T) {
	coll := client.Database("test").Collection(collection)
	var nData []interface{}
	for _, subData := range data {
		nData = append(nData, subData)
	}
	fmt.Println(len(nData))
	createBatch(coll, ctx, nData)
}

func findOne[T any](client *mongo.Client, collection string, ctx context.Context, filter interface{}) *T {
	coll := client.Database("test").Collection(collection)
	return find[T](coll, ctx, filter)
}

func create(collection *mongo.Collection, ctx context.Context, data interface{}) (map[string]interface{}, error) {
	_, err := collection.InsertOne(ctx, data)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func createBatch(collection *mongo.Collection, ctx context.Context, data []interface{}) (map[string]interface{}, error) {
	_, err := collection.InsertMany(ctx, data)
	if err != nil {
		return nil, err
	}
	return nil, nil
}

func find[T any](collection *mongo.Collection, ctx context.Context, filter interface{}) *T {
	cur := collection.FindOne(ctx, filter, options.FindOne())
	var t T
	err := cur.Decode(&t)
	if err != nil {
		return nil
	}
	return &t
}

func connectMongoDB() (*mongo.Client, context.Context) {

	// client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("mongodb+srv://tienlx97:Lexuantien1997@main.ig4xs.mongodb.net"))
	// if err != nil {
	// 	panic(err)
	// }

	client, err := mongo.NewClient(options.Client().ApplyURI("mongodb+srv://tienlx97:Lexuantien1997@main.ig4xs.mongodb.net"))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 20*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	return client, ctx
}

//
func insertPRovince(client *mongo.Client, ctx context.Context) {
	provinceList := getProvinceList()

	for i := 0; i < len(provinceList); i++ {
		provinceList[i].ParentID = "3041582416760087552"
	}

	insertMany(client, "province", ctx, provinceList)

	fmt.Println(findOne[Province](client, "province", ctx, bson.D{{Key: "code", Value: "HN"}}))
}

func insertDistrict(client *mongo.Client, ctx context.Context) {
	districtBDSList := getDistrictList()
	districtFilterCityCodeList := make(map[string][]DistrictBDS)

	for _, districtBDS := range districtBDSList {
		districtFilterCityCodeList[districtBDS.CityCode] = append(districtFilterCityCodeList[districtBDS.CityCode], districtBDS)
	}

	var districtList []District

	for key, districtBDSFilterList := range districtFilterCityCodeList {
		province := findOne[Province](client, "province", ctx, bson.D{{Key: "code", Value: key}})
		if province != nil {
			for _, districtBDSFilter := range districtBDSFilterList {
				district := District{}
				district.General = General{
					ParentID: province.ID,
					Name:     districtBDSFilter.Name,
				}
				district.DistrictID = districtBDSFilter.DistrictId
				districtList = append(districtList, district)
			}
		}
	}
	// fmt.Println(districtList)
	insertMany(client, "district", ctx, districtList)
}

func insertWards(client *mongo.Client, ctx context.Context, f, t int) {
	wardBDSList := getWardByDitrict(f, t) // 734
	wardFilterDistrictIdList := make(map[int][]WardBDS)

	for _, wardBDS := range wardBDSList {
		wardFilterDistrictIdList[wardBDS.DistrictId] = append(wardFilterDistrictIdList[wardBDS.DistrictId], wardBDS)
	}
	var wardList []Ward

	for key, wardBDSFilterList := range wardFilterDistrictIdList {
		district := findOne[District](client, "district", ctx, bson.D{{Key: "districtid", Value: key}})

		if district != nil {
			for _, wardBDSFilter := range wardBDSFilterList {
				ward := Ward{}
				ward.General = General{
					ParentID: district.ID,
					Name:     wardBDSFilter.Name,
				}
				ward.WardID = wardBDSFilter.WardId
				wardList = append(wardList, ward)
			}
		}
	}
	insertMany(client, "ward", ctx, wardList)
}

func main() {

	//
	client, ctx := connectMongoDB()
	defer client.Disconnect(ctx)
	// //

	// insertPRovince(client, ctx)

	// insertDistrict(client, ctx)

	//
	// insertWards(client, ctx, 1, 100)
	// insertWards(client, ctx, 101, 200)
	// insertWards(client, ctx, 201, 300)
	// insertWards(client, ctx, 301, 400)
	// insertWards(client, ctx, 401, 500)
	// insertWards(client, ctx, 501, 600)
	// insertWards(client, ctx, 601, 734)
}
