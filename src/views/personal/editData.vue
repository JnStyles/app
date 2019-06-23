<template>
  <div class="editDtat">
    <x-header :left-options="{backText: ''}">修改资料</x-header>
     <div>
    <group label-width="2.5em" label-margin-right="2em" label-align="right">
        <cell title="" is-link>
            <vue-core-image-upload
                style="width:375px;"
                slot="icon"
                :crop="false"
                @imageuploaded="imageuploaded"
                @errorhandle="errorhandle"
                inputOfFile="file"
                :compress="50"
                :data="data"
                :headers="header"
                :max-file-size="200"
                :url="url">
                <img width="80" :src="avatar"/>
            </vue-core-image-upload>
        </cell>
        <x-input title="昵称" v-model="user_nickname"></x-input>
        <popup-radio title="性别" :options="list" v-model="sex"></popup-radio>

    </group>

  
    <x-button type="warn" class="btn" @click.native="handBtn">确认修改</x-button>

    </div>
  </div>
</template>

<script>
    import base from '@/request/api/base'
    import VueCoreImageUpload from 'vue-core-image-upload';
    export default {
        name: "editDtat",
        data:function(){
            return {
                user_nickname:'',
                avatar:'',
                sex:'',
                list: [{
                    key: '1',
                    value: '男'
                }, {
                    key: '2',
                    value: '女'
                },
                {
                    key: '0',
                    value: '保密'
                }],
                header:{
                    'user-token':localStorage.getItem('token')
                },
                data: {
                    // src: 'http://img1.vued.vanthink.cn/vued0a233185b6027244f9d43e653227439a.png',
                },
                url:base+'/api/share/uploadImg',
            }
        },
        components: {
        'vue-core-image-upload': VueCoreImageUpload
        },
        created(){
            //获取用户信息
            this.$api.activity.getUserInfo({}).then(res =>{
                if(res){
                    this.user_nickname =res.data.data.user_nickname;
                    this.avatar =res.data.data.avatar;
                    this.sex =res.data.data.sex;
                }
            })
        },
        methods: {
            imageuploaded(){

            },
            errorhandle(){

            },
            handBtn(){
                let params ={
                    user_nickname:this.user_nickname,
                    avatar:this.avatar,
                    sex:this.sex,
                }

                this.$api.activity.editUser(params).then(res =>{
                    if(res){
                        
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .btn{
        margin-top:20px;
    }
</style>
