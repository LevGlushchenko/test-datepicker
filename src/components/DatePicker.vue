<script setup lang="ts">
  import { ref, computed } from 'vue'
  import { VDatePicker } from 'vuetify/components'
  import dayjs from 'dayjs'

  enum DateType {
    DAY_BEFORE_YESTERDAY = 'day-before-yesterday',
    YESTERDAY = 'yesterday',
    TODAY = 'today',
    TOMORROW = 'tomorrow',
    DAY_AFTER_TOMORROW = 'day-after-tomorrow'
  }

  const date = ref<string | null>(null)
  const inputDate = ref<string>('')
  const displayedDate = computed(() => {
    if (!date.value) return ''
    return dayjs(date.value).format('DD MMMM YYYY, dd')
  })

  const datePickerRef = ref<VDatePicker>()
  const cssProps = computed(() => {
    const currentMonth = date.value ? dayjs(date.value).format('MMMM') : dayjs().month()
    const currentYear = date.value ? dayjs(date.value).format('YYYY') : dayjs().year()

    return {
      '--month-title': `"${currentMonth}"`,
      '--year-title': `"${currentYear}"`
    }
  })

  const favoriteList = [
    {
      title: 'Позавчора',
      value: DateType.DAY_BEFORE_YESTERDAY,
      action: () => handleSetDate(DateType.DAY_BEFORE_YESTERDAY)
    },
    {
      title: 'Вчора',
      value: DateType.YESTERDAY,
      action: () => handleSetDate(DateType.YESTERDAY)
    },
    {
      title: 'Сьогодні',
      value: DateType.TODAY,
      action: () => handleSetDate(DateType.TODAY)
    },
    {
      title: 'Завтра',
      value: DateType.TOMORROW,
      action: () => handleSetDate(DateType.TOMORROW)
    },
    {
      title: 'Післязавтра',
      value: DateType.DAY_AFTER_TOMORROW,
      action: () => handleSetDate(DateType.DAY_AFTER_TOMORROW)
    }
  ]

  const handleSetDate = (value: DateType) => {
    const currentDate = dayjs()

    switch (value) {
      case DateType.DAY_BEFORE_YESTERDAY:
        date.value = currentDate.add(-2, 'day').locale('uk')
        break
      case DateType.YESTERDAY:
        date.value = currentDate.add(-1, 'day').locale('uk')
        break
      case DateType.TODAY:
        date.value = currentDate.locale('uk')
        break
      case DateType.TOMORROW:
        date.value = currentDate.add(1, 'day').locale('uk')
        break
      case DateType.DAY_AFTER_TOMORROW:
        date.value = currentDate.add(2, 'day').locale('uk')
        break
    }
  }

  const isCalendarOpened = ref<boolean>(false)
  const handleApplyDate = () => {
    inputDate.value = date.value ? dayjs(date.value).format('DD.MM.YYYY') : ''
    isCalendarOpened.value = false
  }
</script>

<template>
  <v-dialog v-model="isCalendarOpened" persistent location-strategy="connected" location="top">
    <template #activator="{ props: calendarDialog }">
      <v-text-field
        label="Дата"
        append-inner-icon="mdi-calendar"
        readonly
        width="200"
        v-model="inputDate"
        v-bind="calendarDialog"
      />
    </template>
    <v-date-picker
      ref="datePickerRef"
      class="custom-date-picker"
      v-model="date"
      color="blue-lighten-3"
      tile
    >
      <template #header>
        <div class="d-flex align-center justify-space-between pl-6">
          <h3 class="text-white text-uppercase">{{ displayedDate }}</h3>
          <v-menu class="text-right" location="right">
            <template #activator="{ props: favoriteList }">
              <v-btn
                color="white"
                variant="text"
                tile
                icon="mdi-calendar-star"
                v-bind="favoriteList"
              />
            </template>
            <v-list class="favorite-list pa-0" tile>
              <v-list-item v-for="item in favoriteList" :key="item.value" @click="item.action">
                <v-list-item-title class="text-left text-uppercase text-grey">
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
      <template #actions>
        <v-btn
          class="custom-date-picker__submit-btn w-100 py-3"
          prepend-icon="mdi-calendar-check"
          variant="tonal"
          tile
          color="grey-darken-1"
          @click="handleApplyDate"
        >
          Обрати
        </v-btn>
      </template>
    </v-date-picker>
  </v-dialog>

  <!--  <v-menu v-model="isCalendarOpened" :close-on-content-click="false" persistent>-->
  <!--    <template #activator="{ props: calendar }">-->
  <!--      <v-text-field-->
  <!--        label="Дата"-->
  <!--        append-inner-icon="mdi-calendar"-->
  <!--        width="200"-->
  <!--        readonly-->
  <!--        v-model="inputDate"-->
  <!--        v-bind="calendar"-->
  <!--      />-->
  <!--    </template>-->
  <!--    <v-date-picker-->
  <!--      ref="datePickerRef"-->
  <!--      class="custom-date-picker"-->
  <!--      v-model="date"-->
  <!--      color="blue-lighten-3"-->
  <!--      tile-->
  <!--    >-->
  <!--      <template #header>-->
  <!--        <div class="d-flex align-center justify-space-between pl-6">-->
  <!--          <h3 class="text-white text-uppercase">{{ displayedDate }}</h3>-->
  <!--          <v-menu v-model="isFavoriteListOpened" class="text-right" location="right">-->
  <!--            <template #activator="{ props: favoriteList }">-->
  <!--              <v-btn-->
  <!--                color="white"-->
  <!--                variant="text"-->
  <!--                tile-->
  <!--                icon="mdi-calendar-star"-->
  <!--                v-bind="favoriteList"-->
  <!--              />-->
  <!--            </template>-->
  <!--            <v-list class="favorite-list pa-0" tile>-->
  <!--              <v-list-item v-for="item in favoriteList" :key="item.value" @click="item.action">-->
  <!--                <v-list-item-title class="text-left text-uppercase text-grey">-->
  <!--                  {{ item.title }}-->
  <!--                </v-list-item-title>-->
  <!--              </v-list-item>-->
  <!--            </v-list>-->
  <!--          </v-menu>-->
  <!--        </div>-->
  <!--      </template>-->
  <!--      <template #actions>-->
  <!--        <v-btn-->
  <!--          class="custom-date-picker__submit-btn w-100 py-3"-->
  <!--          prepend-icon="mdi-calendar-check"-->
  <!--          variant="tonal"-->
  <!--          tile-->
  <!--          color="grey-darken-1"-->
  <!--          @click="handleApplyDate"-->
  <!--        >-->
  <!--          Обрати-->
  <!--        </v-btn>-->
  <!--      </template>-->
  <!--    </v-date-picker>-->
  <!--  </v-menu>-->
</template>

<style lang="scss">
  .custom-date-picker {
    .v-picker-title {
      display: none;
    }
    .v-picker {
      &__actions {
        padding: 0;
      }
    }
    .v-date-picker-month {
      &__day {
        .v-btn {
          border-radius: 0;
        }
        &--selected {
          .v-btn {
            color: white !important;
          }
        }
      }
      &__weekday {
        text-transform: uppercase;
        color: grey;
        display: block;
        visibility: hidden;
        text-align: center;

        &:first-letter {
          visibility: visible;
        }
      }
    }
    .v-date-picker-controls {
      position: relative;
      margin-bottom: 10px;
      padding: 0 48px 0 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      .v-spacer {
        display: none;
      }
      .v-btn {
        position: relative;
        z-index: 20;
        text-transform: uppercase;
        border-radius: 0;
        font-weight: 600;
      }
      &__month {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .v-btn {
          border-radius: 0;
        }
      }
    }
    .v-date-picker-months {
      &__content {
        .v-btn {
          border-radius: 0;
          &--active {
            color: white !important;
          }
        }
      }
    }
    .v-date-picker-years {
      &__content {
        .v-btn {
          border-radius: 0;
          &--active {
            color: white !important;
          }
        }
      }
    }
    &__submit-btn {
      &.v-btn.v-btn--density-default {
        height: auto;
      }

      .v-icon--size-default {
        font-size: 36px;
      }

      .v-btn__content {
        font-size: 22px;
        font-weight: 400;
      }

      &:hover,
      &:focus {
        background-color: #90caf9;
        color: white !important;
      }
    }
  }
  .favorite-list {
    .v-list-item:not(:last-child) {
      border-bottom: 1px solid rgba(0, 0, 0, 0.25);
    }
  }
</style>
