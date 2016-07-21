import Models = InStoreCollectionWebApi.Models;
import { Entity} from 'breeze-client'

export interface CollectionPoint extends Models.CollectionPoint, Entity { }
export interface DeviceInfo extends Models.DeviceInfo, Entity { }
export interface Parcel extends Models.Parcel, Entity { }
export interface ParcelGroup extends Models.ParcelGroup, Entity { }
export interface Shop extends Models.Shop, Entity { }
export interface ShopRegistration extends Models.ShopRegistration, Entity { }
export interface Store extends Models.Store, Entity { }
export interface StoreGroup extends Models.StoreGroup, Entity { }
export interface StoreRegistration extends Models.StoreRegistration, Entity { }