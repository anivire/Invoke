<script setup lang="ts">
    import { MessageType } from '../models/MessageType';
    import { InformationCircleIcon, ShieldExclamationIcon, XCircleIcon } from "@heroicons/vue/20/solid";

    defineProps<{ message: string, messageType: MessageType }>()
</script>

<template>
    <div :class="(messageType == MessageType.error)?'from-red-500/25 to-rose-500/50 border-rose-600/25'
                :(messageType == MessageType.warn)?'from-amber-500/25 to-orange-500/50 border-amber-600/25'
                :'from-green-600/25 to-emerald-600/50 border-green-600/25'"
         class="border-2 bg-gradient-to-r rounded-lg p-2 flex justify-center shadow-md my-5">
        <div class="mr-2" v-if="messageType == MessageType.error">
            <XCircleIcon class="h-6 w-6"/>
        </div>
        <div class="mr-2" v-else-if="messageType == MessageType.warn">
            <ShieldExclamationIcon class="h-6 w-6"/>
        </div>
        <div class="mr-2" v-else>
            <InformationCircleIcon class="h-6 w-6"/>
        </div>
        <p>{{message}}</p>
    </div>
</template>