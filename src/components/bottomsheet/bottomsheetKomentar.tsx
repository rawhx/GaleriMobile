import {Dimensions, KeyboardAvoidingView, Platform, StyleSheet, View} from 'react-native';
import React, {
  forwardRef,
  useImperativeHandle,
  useCallback,
  useState,
  useEffect,
} from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useAnimatedScrollHandler,
  AnimatedScrollViewProps,
  runOnJS,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import BackDrop from './BackDrop';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import { Text } from 'react-native-ui-lib';
import { assets } from '../../assets';
import { getKomentarApi } from '../../api/getKomentarApi';
import { DataKomentar, InputKomentar, ViewAddKomentar } from '..';
import { postKomentar } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import styleDefault from '../../assets/styles';

interface Props extends AnimatedScrollViewProps {
  snapTo: string;
  backgroundColor: string;
  backDropColor: string;
}

export interface BottomSheetMethods {
  expand: () => void;
  close: () => void;
}

const BottomSheetKomentar = forwardRef<BottomSheetMethods, Props>(
  ({snapTo, children, backgroundColor, fotoId, backDropColor, ...rest}: Props, ref) => {
    const inset = useSafeAreaInsets();
    const {height} = Dimensions.get('screen');
    const percentage = parseFloat(snapTo.replace('%', '')) / 100;
    const closeHeight = height;
    const openHeight = height - height * percentage;
    const topAnimation = useSharedValue(closeHeight);
    const context = useSharedValue(0);
    const scrollBegin = useSharedValue(0);
    const scrollY = useSharedValue(0);
    const [enableScroll, setEnableScroll] = useState(true);
    const [dataKomentar, setKomentar] = useState({
      count: 0,
      komentar: null
    });

    const [addKomentar, setAddKomentar] = useState()
    const [sendKomen, setSendKomen] = useState(false)
    const [komentarList, setKomentarList] = useState([]);

    const navigation = useNavigation()
    
    useEffect(()=>{
      const getData = async () => {
        const komentar = await getKomentarApi({fotoId: fotoId, limit: 20})
        setKomentar(komentar)
      }
      getData()
    }, [fotoId])

    const expand = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(openHeight);
      navigation.getParent()?.setOptions({
        tabBarStyle: {
            display: "none"
        }
      });
    }, [openHeight, topAnimation]);

    const close = useCallback(() => {
      'worklet';
      topAnimation.value = withTiming(closeHeight);
      navigation.getParent()?.setOptions({
        tabBarStyle: styleDefault.tabBar,
      });
    }, [closeHeight, topAnimation]);

    useImperativeHandle(
      ref,
      () => ({
        expand,
        close,
      }),
      [expand, close],
      
    );

    const animationStyle = useAnimatedStyle(() => {
      const top = topAnimation.value;
      return {
        top,
      };
    });

    const pan = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(context.value + event.translationY, {
            damping: 100,
            stiffness: 400,
          });
        }
      })
      .onEnd(() => {
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const onScroll = useAnimatedScrollHandler({
      onBeginDrag: event => {
        scrollBegin.value = event.contentOffset.y;
      },
      onScroll: event => {
        scrollY.value = event.contentOffset.y;
      },
    });

    const panScroll = Gesture.Pan()
      .onBegin(() => {
        context.value = topAnimation.value;
      })
      .onUpdate(event => {
        if (event.translationY < 0) {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else if (event.translationY > 0 && scrollY.value === 0) {
          runOnJS(setEnableScroll)(false);
          topAnimation.value = withSpring(
            Math.max(
              context.value + event.translationY - scrollBegin.value,
              openHeight,
            ),
            {
              damping: 100,
              stiffness: 400,
            },
          );
        }
      })
      .onEnd(() => {
        runOnJS(setEnableScroll)(true);
        if (topAnimation.value > openHeight + 50) {
          topAnimation.value = withSpring(closeHeight, {
            damping: 100,
            stiffness: 400,
          });
        } else {
          topAnimation.value = withSpring(openHeight, {
            damping: 100,
            stiffness: 400,
          });
        }
      });

    const scrollViewGesture = Gesture.Native();

    const kirimPesan = async () => {
      if (addKomentar !== '') {
        const res = await postKomentar({
            foto_id: fotoId,
            komentar: addKomentar
        })
        const newKomentarList = [...komentarList];
        newKomentarList.push(addKomentar);
        setKomentarList(newKomentarList);
        setAddKomentar('');
        setSendKomen(true)
      }
    }

    const ViewKomentar = () => {
      const komen = dataKomentar.komentar
      if (komen) {
        return (
            <View>
                {
                    komen.map((item) => (
                        <DataKomentar key={item.id} isikomentar={item.IsiKomentar} tanggalkomentar={item.TanggalKomentar} username={item.user.Username} profile={item.user.FotoProfil} />
                    ))
                }
            </View>
        )
      } else {
        if (!sendKomen) {
          return (
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{fontFamily: 'Poppins-Medium', fontSize: 12}}>Tidak ada komentar</Text>
            </View>
          )
        }
      }
    }

    return (
      <>
        <BackDrop
          topAnimation={topAnimation}
          backDropColor={backDropColor}
          closeHeight={closeHeight}
          openHeight={openHeight}
          close={close}
        />
        <GestureDetector gesture={pan}>
          <Animated.View
            style={[
              styles.container,
              animationStyle,
              {
                backgroundColor: backgroundColor,
                paddingBottom: inset.bottom,
                paddingHorizontal: 20
              },
            ]}>
            <View style={styles.lineContainer}>
              <View style={styles.line} />
            </View>
            <Text style={[assets.fonts.bold, {textAlign: 'center', fontSize: 18}]}>{dataKomentar.count} Komentar</Text>
            <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, marginBottom: 10}}
            >
              <View paddingH-25>
                <View style={assets.styleDefault.garis2} />
              </View>
              <GestureDetector
                gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}>
                <Animated.ScrollView
                  {...rest}
                  scrollEnabled={enableScroll}
                  bounces={false}
                  scrollEventThrottle={16}
                  onScroll={onScroll}>
                  {komentarList.map((komentar, index) => (
                    <ViewAddKomentar
                      key={index}
                      isikomentar={komentar}
                    />
                  ))}
                  <ViewKomentar/>
                  {children}
                </Animated.ScrollView>
              </GestureDetector>
              <View paddingH-25>
                <View style={assets.styleDefault.garis2} />
              </View>
              <View paddingH-20>
                <InputKomentar 
                  value={addKomentar}
                  onChangeText={text => setAddKomentar(text)}
                  onPress={kirimPesan}
                />
              </View>
            </KeyboardAvoidingView>
          </Animated.View>
        </GestureDetector>
      </>
    );
  },
);

export default BottomSheetKomentar;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 100,
    bottom: 0
  },
  lineContainer: {
    marginVertical: 10,
    alignItems: 'center',
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});