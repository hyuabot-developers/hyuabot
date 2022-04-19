import {defineStore} from 'pinia';
import {ReadingRoomItem} from 'src/models/readingRoom.item';
import {api} from 'boot/axios';
import {AxiosResponse} from 'axios';

export type ReadingRoomState = {
  readingRoomList: ReadingRoomItem[];
}
export const useReadingRoomStore = defineStore({
  id: 'readingRoomStore',
  state: () => ({readingRoomList: []} as ReadingRoomState),
  getters: {
    getArrivalList: (state: ReadingRoomState) => {
      return (readingRoomName: string) => state.readingRoomList.filter(item => item.name === readingRoomName)
    },
  },
  actions: {
    fetchReadingRoomList(campus: string) {
      api.get(`/library/${campus}`).then(
        (response: AxiosResponse<ReadingRoomItem[]>) => {
          this.readingRoomList = response.data;
        }
      );
    },
  },
});
