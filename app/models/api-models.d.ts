declare module InStoreCollectionWebApi.Models {
	interface CollectionPoint {
		Address: string;
		Id: number;
		Latitiude: number;
		Longitude: number;
		Name: string;
		ParcelGroups: InStoreCollectionWebApi.Models.ParcelGroup[];
		Shops: InStoreCollectionWebApi.Models.Shop[];
		Status: string;
		Stores: InStoreCollectionWebApi.Models.Store[];
	}
	interface DeviceInfo {
		AppVersion: string;
		DateCreated: Date;
		DateUpdated: Date;
		Id: number;
		Model: string;
		Platform: string;
		ShopRegistration: InStoreCollectionWebApi.Models.ShopRegistration;
		StoreRegistration: InStoreCollectionWebApi.Models.StoreRegistration;
		Token: string;
		UUID: string;
		Version: string;
	}
	interface Parcel {
		CollectionType: string;
		DateCollectedByCustomer: Date;
		DateReturnedToStore: Date;
		DateScannedIntoStore: Date;
		DocumentNumber: string;
		DocumentType: string;
		Id: number;
		ParcelGroup: InStoreCollectionWebApi.Models.ParcelGroup;
		ParcelGroupId: number;
		ParcelNumber: number;
		Status: string;
		TrackingNumber: string;
	}
	interface ParcelGroup {
		AgeInHours: number;
		CollectionPoint: InStoreCollectionWebApi.Models.CollectionPoint;
		CollectionPointId: number;
		CustomerReference: string;
		DateCreated: Date;
		Id: number;
		InvoiceNumber: string;
		IsMobilePhoneNumber: number;
		Notes: string;
		ParcelCount: number;
		Parcels: InStoreCollectionWebApi.Models.Parcel[];
		PersonName: string;
		PersonPhone: string;
		Pin: string;
		Status: string;
	}
	interface Shop {
		Address: string;
		CollectionPoint: InStoreCollectionWebApi.Models.CollectionPoint;
		CollectionPointId: number;
		Id: number;
		Latitude: number;
		Longitude: number;
		Name: string;
		ShopRegistrations: InStoreCollectionWebApi.Models.ShopRegistration[];
	}
	interface ShopRegistration {
		Address: string;
		ContactPerson: string;
		DeviceInfo: InStoreCollectionWebApi.Models.DeviceInfo;
		Id: number;
		Latitiude: number;
		Longitude: number;
		Name: string;
		Phone: string;
		Shop: InStoreCollectionWebApi.Models.Shop;
		ShopId: number;
		Status: string;
	}
	interface Store {
		Address: string;
		CollectionPoint: InStoreCollectionWebApi.Models.CollectionPoint;
		CollectionPointId: number;
		Id: number;
		Latitude: number;
		Longitude: number;
		Name: string;
		StoreCode: string;
		StoreGroup: InStoreCollectionWebApi.Models.StoreGroup;
		StoreGroupId: number;
		StoreRegistrations: InStoreCollectionWebApi.Models.StoreRegistration[];
	}
	interface StoreGroup {
		Id: number;
		Name: string;
		StoreGroupCode: string;
		Stores: InStoreCollectionWebApi.Models.Store[];
	}
	interface StoreRegistration {
		DeviceInfo: InStoreCollectionWebApi.Models.DeviceInfo;
		Id: number;
		Status: string;
		Store: InStoreCollectionWebApi.Models.Store;
		StoreId: number;
	}
}


