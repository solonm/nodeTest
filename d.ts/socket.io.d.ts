declare var io: () => any;

interface Socket {
    on(event: string, callback: (data: any) => void);
    emit(event: string, data: any);
}